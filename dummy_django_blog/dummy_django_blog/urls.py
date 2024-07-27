"""Django urls"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import handler404, handler500
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.views import (
    LoginView,
    LogoutView,
    PasswordChangeView,
    PasswordChangeDoneView,
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
)


import dummy_django_blog.views
import authentication.views
import blog.views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", blog.views.home, name="home"),
    path("home/", blog.views.home, name="home"),
    path("about/", blog.views.about, name="about"),
    path("photos/", blog.views.photos_view, name="photos"),
    path("photos/add/", blog.views.photos_add, name="photos_add"),
    path("photos/add-multiple/", blog.views.photos_add_multiple, name="photos_add_multiple"),
    path("photos/<int:id>/detail/", blog.views.photos_detail, name="photos_detail"),
    path("photos/<int:id>/update/", blog.views.photos_update, name="photos_update"),
    path("photos/<int:id>/delete/", blog.views.photos_delete, name="photos_delete"),
    path("posts/", blog.views.posts_view, name="posts"),
    path("posts/add/", blog.views.post_and_photo_add, name="posts_add"),
    path("posts/<int:id>/detail/", blog.views.posts_detail, name="posts_detail"),
    path("posts/<int:id>/update/", blog.views.posts_update, name="posts_update"),
    path("posts/<int:id>/delete/", blog.views.posts_delete, name="posts_delete"),
    path("users/follow/", blog.views.follow_user, name="follow_user"),
    path("feed/", blog.views.feed, name="feed"),
    path("contact_admin/", blog.views.contact_admin, name="contact_admin"),
    path("signin/", authentication.views.signin, name="signin"),
    path("profile/update/", authentication.views.update_profile_image, name="update_profile_image"),
    path("login/", LoginView.as_view(
        template_name="authentication/login.html",
        redirect_authenticated_user=True,
    ), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("password-change/", PasswordChangeView.as_view(
        template_name="authentication/password_change.html",
    ), name="password_change"),
    path("password-change/done/", PasswordChangeDoneView.as_view(
        template_name="authentication/password_change_done.html",
    ), name="password_change_done"),
    path("password_reset/", PasswordResetView.as_view(
        template_name="authentication/password_reset.html",
        success_url="/password_reset/done",
    ), name="password_reset"),
    path("password_reset/done/", PasswordResetDoneView.as_view(
        template_name="authentication/password_reset_done.html",
    ), name="password_reset_done"),
    path("reset/<uidb64>/<token>/", PasswordResetConfirmView.as_view(
        template_name="authentication/password_reset_confirm.html"
    ), name="password_reset_confirm"),
    path("reset/done/", PasswordResetCompleteView.as_view(
        template_name="authentication/password_reset_confirm.html",
    ), name="password_reset_complete"),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )


handler404 = dummy_django_blog.views.handler404
handler500 = dummy_django_blog.views.handler500
