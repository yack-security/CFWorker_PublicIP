# CFWorker_PublicIP

This is a simple Cloudflare Worker that returns your client public IP address. No extra stuff like tracking or ads, just your IP address.

See it live at [https://ip.yack.one](https://ip.yack.one).

## 📖 Usage

### Get ip address in plain text

```bash
curl -s https://ip.yack.one
# output: x.x.x.x

# on Windows:
Invoke-WebRequest 'https://ip.yack.one' | Select-Object -Expand Content
```

### Get ip address in json format (with additional information)

```bash
curl -s https://ip.yack.one/json

# curl -s https://ip.yack.one/json | jq
# curl -s https://ip.yack.one/json | jq '.ip'
```

Output example:

```json
{
  "ip": "x.x.x.x",
  "latitude": "<latitude>",
  "longitude": "<longitude>",
  "asn": 000,
  "asOrganization": "ISP",
  "region": "<region>",
  "regionCode": "<regionCode>",
  "city": "<city>",
  "postalCode": "<postalCode>",
  "country": "<country>",
  "timezone": "<timezone>",
  "colo": "<colo>",
  "httpProtocol": "HTTP/2"
}
```
