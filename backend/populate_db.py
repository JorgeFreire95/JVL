import os
import django
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import Announcement, ContactCard

def populate():
    # Create Announcements
    if not Announcement.objects.exists():
        Announcement.objects.create(
            title='Retiro de Jóvenes',
            date=date(2025, 10, 25),
            time='8:00 AM - 5:00 PM',
            location='Campamento Monte Horeb',
            description='Un día de comunión, juegos y estudio bíblico para todos los jóvenes de la iglesia.',
            category='Jóvenes'
        )
        Announcement.objects.create(
            title='Cena de Acción de Gracias',
            date=date(2025, 11, 20),
            time='6:00 PM',
            location='Salón Social de la Iglesia',
            description='Ven a compartir con nosotros una cena especial para agradecer a Dios por sus bendiciones.',
            category='Iglesia General'
        )
        print("Anuncios creados.")
    else:
        print("Anuncios ya existen.")

    # Create Contact Cards
    if not ContactCard.objects.exists():
        ContactCard.objects.create(
            name='Rev. Juan Pérez',
            role='Pastor Principal',
            whatsapp_link='https://wa.me/1234567890',
            order=1
        )
        ContactCard.objects.create(
            name='María González',
            role='Secretaria',
            whatsapp_link='https://wa.me/1234567890',
            order=2
        )
        print("Tarjetas de contacto creadas.")
    else:
        print("Tarjetas de contacto ya existen.")

if __name__ == '__main__':
    populate()
