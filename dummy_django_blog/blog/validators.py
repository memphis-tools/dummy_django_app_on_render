import string
from django.core.exceptions import ValidationError


def is_special_char(char):
    return char in string.punctuation


class MustContainsSpecialChar:
    def __call__(self, title):
        if not any(is_special_char(char) for char in title):
            raise ValidationError("Au moins 1 caractère spécial dans le titre est attendu")

    def get_help_text(self):
        return "Au moins 1 caractère spécial dans le titre est attendu"

    def deconstruct(self):
        return (
            'blog.validators.MustContainsSpecialChar', [], {}
        )
