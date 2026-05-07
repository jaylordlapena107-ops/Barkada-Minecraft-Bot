const mc =
require(
  "minecraft-protocol"
);

const express =
require("express");

const app =
express();

app.get("/", (req, res) => {

  res.send(
    "Bot Online"
  );
});

app.listen(
  process.env.PORT || 3000
);

function connectBot() {

  console.log(
    "Connecting..."
  );

  const client =
    mc.createClient({

      host:
        "barkadacraftsmp.sg1-mczie.fun",

      port: 4090,

      username:
        "BarkadaBot",

      auth:
        "offline",

      version:
        "1.19.4"
    });

  client.on(
    "connect",
    () => {

      console.log(
        "Connected!"
      );
    }
  );

  client.on(
    "packet",
    (data, meta) => {

      // authme detection
      if (
        meta.name === "system_chat"
      ) {

        const msg =
          JSON.stringify(data);

        console.log(msg);

        if (
          msg.includes(
            "/register"
          )
        ) {

          client.write(
            "chat_command",
            {
              command:
                "register 011020 011020"
            }
          );
        }

        if (
          msg.includes(
            "/login"
          )
        ) {

          client.write(
            "chat_command",
            {
              command:
                "login 011020"
            }
          );
        }
      }
    }
  );

  client.on(
    "end",
    () => {

      console.log(
        "Disconnected"
      );

      setTimeout(
        connectBot,
        10000
      );
    }
  );

  client.on(
    "error",
    err => {

      console.log(err);
    }
  );
}

connectBot();
