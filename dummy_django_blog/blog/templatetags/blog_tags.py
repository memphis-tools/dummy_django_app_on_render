from django.template import Library
from django.utils import timezone


register = Library()
MINUTE = 60
HOUR = 60 * MINUTE
DAY = 24 * HOUR


@register.filter
def model_type(value):
    return type(value).__name__


@register.simple_tag(takes_context=True)
def get_poster(context, user):
    if context["user"] == user:
        return "vous"
    return user


@register.filter
def format_created_date(created_at):
    seconds_ago = (timezone.now() - created_at).total_seconds()
    if seconds_ago <= HOUR:
        return f'Publié il y a {int(seconds_ago // MINUTE)} minute(s).'
    elif seconds_ago <= DAY:
        return f'Publié il y a {int(seconds_ago // HOUR)} heure(s).'
    return f'Publié le {created_at.strftime("%d %b %y à %Hh%M")}'
