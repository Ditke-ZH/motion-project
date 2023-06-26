FROM continuumio/miniconda3

RUN mkdir -p /backend
RUN mkdir -p /scripts
RUN mkdir -p /frontend

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

COPY ./backend/requirements.yml /backend/requirements.yml

COPY ./scripts /scripts
RUN chmod +x /scripts

RUN /opt/conda/bin/conda env create -f /backend/requirements.yml

ENV PATH /opt/conda/envs/group3_motion/bin:$PATH
RUN echo "source activate group3_motion" >~/.bashrc

WORKDIR /frontend
COPY ./frontend/package.json /frontend/
COPY ./frontend/package-lock.json /frontend/
RUN npm install
COPY ./frontend /frontend
RUN npm run build

COPY ./backend /backend

WORKDIR /backend