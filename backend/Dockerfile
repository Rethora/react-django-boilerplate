FROM python:3.10-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /backend

COPY requirements.txt .
# RUN pip install -r requirements.txt
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY . /backend/