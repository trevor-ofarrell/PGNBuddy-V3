/* NdjsonStreamer @license MIT
    This file has been modified by Trevor O'Farrell for use in PGNBuddy under the AGPL licence
    link to original file: https://github.com/browsercaptures/chess/blob/master/fetchutils.js
*/
class NdjsonStreamer {
  constructor(props) {
    this.props = props || {};
    this.token = this.props.token;
    this.streaming = false;
  }

  close() {
    if (!this.streaming) {
      return;
    }

    this.streaming = false;

    if (this.readable) {
      this.readable.destroy();
      this.readable = null;
    }
  }

  stream() {
    this.streaming = true;
    this.readable = null;
    const headers = {
      Accept: 'application/x-ndjson',
    };

    if (this.token) headers.Authorization = `Bearer ${this.token}`;

    let lastTick = new Date().getTime();

    if (this.props.timeout) {
      const checkInterval = setInterval(() => {
        if ((new Date().getTime() - lastTick) > this.props.timeout * 1000) {
          clearInterval(checkInterval);
          if (this.props.timeoutCallback) this.props.timeoutCallback();
        }
      }, this.props.timeout / 3);
    }

    let buffer = '';

    fetch(this.props.url, {
      headers,
    })
      .then((response) => {
        this.readable = response.body;
        this.readable.on('end', () => {
          if (this.props.endcallback) this.props.endcallback(response);
        });

        this.readable.on('data', (chunk) => {
          lastTick = new Date().getTime();

          buffer += chunk.toString();

          if (buffer.match(/\n/)) {
            const parts = buffer.split(/\n/);

            buffer = parts.pop();

            for (const part of parts) {
              try {
                const blob = JSON.parse(part);
                if (this.props.callback) {
                  this.props.callback(blob);
                }
              } catch (err) { return (err); }
            }
          }
        });
      });
  }
}

export default NdjsonStreamer;
