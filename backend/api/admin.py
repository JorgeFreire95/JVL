from django.contrib import admin
from .models import Announcement, ContactCard

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'category')
    list_filter = ('category', 'date')
    search_fields = ('title', 'description')

@admin.register(ContactCard)
class ContactCardAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order')
    list_editable = ('order',)
    search_fields = ('name', 'role')
