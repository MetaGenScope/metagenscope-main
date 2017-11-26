from markadams/chromium-xvfb

# Add environment variables
ARG TEST_URL
ENV TEST_URL $TEST_URL

# Install Node
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists

# Install Python 3.6
# RUN apt-get install python3
# RUN curl -sL https://www.python.org/ftp/python/3.6.3/Python-3.6.3.tgz \
#     && tar xvf Python-3.6.3.tgz \
#     && cd Python-3.6.3 \
#     && ./configure --enable-optimizations \
#     && make -j8 \
#     && make altinstall \
#     && mv python3.6 /usr/local/bin/python3.6 \
#     && cd ../ \
#     && rm Python-3.6.3.tgz \
#     && rm -r Python-3.6.3

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN mkdir /usr/src/app/test-artifacts
RUN mkdir /usr/src/app/test-artifacts/screenshots
RUN chmod -R 777 /usr/src/app/test-artifacts

# Install Testcafe
RUN npm install --silent
