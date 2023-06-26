FROM continuumio/miniconda3

RUN mkdir -p /backend
RUN mkdir -p /scripts

COPY ./backend/requirements.yml /backend/requirements.yml

COPY ./scripts /scripts
RUN chmod +x /scripts

RUN /opt/conda/bin/conda env create -f /backend/requirements.yml

ENV PATH /opt/conda/envs/group3_motion/bin:$PATH
RUN echo "source activate group3_motion" >~/.bashrc

COPY ./backend /backend

WORKDIR /backend