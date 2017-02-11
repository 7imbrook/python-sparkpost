FROM python:3.6

WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY ./ /app

ENV FLASK_APP=main.py

EXPOSE 5000
CMD flask run --host 0

