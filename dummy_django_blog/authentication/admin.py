from django.contrib import admin
from django.contrib.auth import get_user_model


User = get_user_model()


class UserAdminModel(admin.ModelAdmin):
    list_display = ["username"]


admin.site.register(User, UserAdminModel)
