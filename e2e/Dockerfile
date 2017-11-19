FROM circleci/node:9.2.0-browsers

# Set working directory
RUN mkdir ~/app
WORKDIR ~/app

# Add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Add environment variables
ARG TEST_URL
ENV TEST_URL $TEST_URL

# Add requirements (to leverage Docker cache)
ADD ./package.json /usr/src/app/package.json

# install requirements
RUN npm install --silent

# Add app
ADD . /usr/src/app

# Run tests
CMD sh test.sh
