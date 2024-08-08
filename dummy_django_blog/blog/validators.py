import string
from django.core.exceptions import ValidationError


def is_special_char(char):
    return char in string.punctuation


class MustContainsDigit:
    def __call__(self, title):
        if not any(char.isdigit for char in title):
            raise ValidationError("Au moins 1 chiffre attendu dans le titre")

    def get_help_text(self):
        return "Au moins 1 chiffre attendu dans le titre"

    def deconstruct(self):
        return (
            'blog.validators.MustContainsDigit', [], {}
        )
