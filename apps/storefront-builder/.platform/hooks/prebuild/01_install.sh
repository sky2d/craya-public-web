#!/bin/bash
yum clean all
yum install -y vips-devel
cd /var/app/staging
npm rebuild sharp