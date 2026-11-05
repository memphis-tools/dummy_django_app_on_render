import requests
from django.conf import settings

def send_via_sendgrid(to_email, subject, text_body, reply_to=None):
    """Envoi via l'API HTTP SendGrid (443) — contourne l'egress SMTP bloqué."""
    payload = {
        "personalizations": [
            {"to": [{"email": to_email}]}
        ],
        "from": {"email": settings.DEFAULT_FROM_EMAIL},
        "subject": subject,
        "content": [{"type": "text/plain", "value": text_body}],
    }
    if reply_to:
        payload["reply_to"] = {"email": reply_to}

    resp = requests.post(
        "https://api.sendgrid.com/v3/mail/send",
        headers={
            "Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=10,
    )
    if resp.status_code not in (200, 202):
        raise RuntimeError(f"SendGrid API error: {resp.status_code} {resp.text}")