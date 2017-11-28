FROM testcafe/testcafe

# Switch back to root user
USER root

# Create $HOME (otherwise npm complains)
RUN mkdir -p $HOME

# ToDo: Convenience alias
# RUN echo 'alias testcafe-docker="/opt/testcafe/docker/testcafe-docker.sh"' >> ~/.ashrc

# Install dependencies
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

# Copy tests
WORKDIR /usr/src/app
ADD . /usr/src/app

# Add environment variables
ARG TEST_URL
ENV TEST_URL $TEST_URL
