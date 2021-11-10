# CSE6431 Primary-Backup System

## Howto

**Deploy**:

```shell
# initialize `database'
echo "0" > db.txt

# install deps
yarn
```

**Run**:

```shell
# In window 1, start rproxy first
npm run rproxy_server
# In window 2, start main server
npm run main_server
# In window 3, start backup server
npm run backup_server
```

**Demo**:

```shell
# kill the main
kill -int <pid of main_server>
# then backup server will take in place
```

