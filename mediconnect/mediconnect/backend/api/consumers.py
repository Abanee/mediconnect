
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatMessage, Appointment, User

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            self.appointment_id = self.scope['url_route']['kwargs']['appointment_id']
            self.room_group_name = f'chat_{self.appointment_id}'

            # Validate appointment exists and user has access
            if await self.validate_appointment_access():
                await self.channel_layer.group_add(
                    self.room_group_name,
                    self.channel_name
                )
                await self.accept()
            else:
                await self.close()
        except Exception as e:
            print(f"WebSocket connection error: {e}")
            await self.close()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json.get('message', '').strip()
            sender_id = text_data_json.get('sender_id')
            
            if not message or not sender_id:
                return

            # Save message to database
            await self.save_message(sender_id, message)

            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'sender_id': sender_id
                }
            )
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                'error': 'Invalid JSON format'
            }))

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender_id': event['sender_id']
        }))

    @database_sync_to_async
    def validate_appointment_access(self):
        """Validate that the appointment exists and user has access"""
        try:
            appointment = Appointment.objects.get(id=self.appointment_id)
            # Add your access validation logic here
            return True
        except Appointment.DoesNotExist:
            return False

    @database_sync_to_async
    def save_message(self, sender_id, message):
        try:
            sender = User.objects.get(id=sender_id)
            appointment = Appointment.objects.get(id=self.appointment_id)
            ChatMessage.objects.create(
                appointment=appointment,
                sender=sender,
                message=message
            )
        except (User.DoesNotExist, Appointment.DoesNotExist) as e:
            print(f"Error saving message: {e}")