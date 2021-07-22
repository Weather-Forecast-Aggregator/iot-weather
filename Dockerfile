FROM node:14-alpine

ENV WORKINGDIR=/app

RUN mkdir -p ${WORKINGDIR}

WORKDIR ${WORKINGDIR}

# Install Dependencies
RUN pwd
RUN ls -la
COPY ./src/package*.json ${WORKINGDIR}/

RUN cd ${WORKINGDIR} && npm install --silent

# Copy app source code
COPY ./src ${WORKINGDIR}/

# Exports
EXPOSE 15600

CMD ["npm", "start"]