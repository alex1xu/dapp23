import { useRef, useEffect, useState } from "react";
import $ from "jquery";
import { forwardRef, useImperativeHandle } from "react";

const arenaSize = 600;
const startOffset = 25;
const drosWidth = 50;
const effectWidth = 400;
const effectHeight = 300;
const mxv = 13;
let ticks = 0;
let lastTick = 0;
let lastTickX = -1,
  lastTickY = -1;

let cumDamage = { red: 0, blue: 0 };

const Ring = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  let gameActive = false;

  const dros1Ref = useRef({});
  const dros2Ref = useRef({});

  const displayText = (text) => {
    const broadcastText = $(".broadcast-text");
    broadcastText.text(text);
  };

  const startLoop = () => {
    setTimeout(() => {
      requestIdRef.current = requestAnimationFrame(tick);
    }, 1000 / 50);

    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  };

  const stopLoop = () => {
    $(".arena-ring").addClass("shaker");
    setTimeout(() => {
      $(".arena-ring").removeClass("shaker");
    }, 2000);
    $(".arena-ring").addClass("tint2");

    const dros1 = dros1Ref.current,
      dros2 = dros2Ref.current;

    dros1.nextMode = 100000000;
    dros2.nextMode = 100000000;

    if (dros1.health <= 0) {
      props?.setwinner("BLUE");
      dros1.theta = Math.atan2(
        arenaSize / 2 - dros1.y,
        arenaSize / 2 - dros1.x
      );
      dros1.mxv = 35;
      dros2.mxv = 5;
      dros1.mode = -1;
      dros2.mode = 0;
    } else {
      props?.setwinner("RED");
      dros2.theta = Math.atan2(
        arenaSize / 2 - dros2.y,
        arenaSize / 2 - dros2.x
      );
      dros2.mxv = 35;
      dros1.mxv = 5;
      dros1.mode = 0;
      dros2.mode = -1;
    }

    displayText("K.O.");
    let funcs = [
        () => {
          displayText("K.O.");
        },
        () => {
          displayText(dros1Ref.current.health > 0 ? "Red Wins!" : "Blue Wins!");
        },
        () => {
          displayText(dros1Ref.current.health > 0 ? "Red Wins!" : "Blue Wins!");
        },
      ],
      i = 0,
      timer = setInterval(callFuncs, 1000);

    function callFuncs() {
      funcs[i++]();
      if (i === funcs.length) clearInterval(timer);
    }
  };

  useImperativeHandle(ref, () => ({
    startMatch() {
      if (!gameActive) {
        $(".arena-ring").addClass("tint2");
        gameActive = true;

        displayText("3");
        let funcs = [
            () => {
              displayText("2");
            },
            () => {
              displayText("1");
            },
            () => {
              displayText("Fight!");
            },
            () => {
              $(".arena-ring").removeClass("tint2");
              startLoop();
              displayText("");
            },
          ],
          i = 0,
          timer = setInterval(callFuncs, 1000);

        function callFuncs() {
          funcs[i++]();
          if (i === funcs.length) clearInterval(timer);
        }
      }
    },
    loadDros(dros1, dros2) {
      dros1Ref.current = {
        x: startOffset,
        y: arenaSize / 2,
        mxv: mxv,
        health: 5 + dros1?.attributes.at(-1)?.health / 3,
        mxh: 5 + dros1?.attributes.at(-1)?.health / 3,
        atk: 5 + dros1?.attributes.at(-1)?.strength / 3,
        stm: dros1?.attributes.at(-1)?.stamina / 3,
        spd: dros1?.attributes.at(-1)?.speed / 3,
        crt: dros1?.attributes.at(-1)?.critical / 3,
        def: dros1?.attributes.at(-1)?.defense / 3,
        theta: 0,
        mode: 0,
        nextMode: 50 + Math.random() * 200,
        w: drosWidth,
        h: (drosWidth * 19) / 25,
        src: dros1?.image,
        team: "red",
      };
      dros2Ref.current = {
        x: arenaSize - startOffset,
        y: arenaSize / 2,
        mxv: mxv,
        health: 5 + dros2?.attributes.at(-1)?.health / 3,
        mxh: 5 + dros2?.attributes.at(-1)?.health / 3,
        atk: 5 + dros2?.attributes.at(-1)?.strength / 3,
        stm: dros2?.attributes.at(-1)?.stamina / 3,
        spd: dros2?.attributes.at(-1)?.speed / 3,
        crt: dros2?.attributes.at(-1)?.critical / 3,
        def: dros2?.attributes.at(-1)?.defense / 3,
        theta: Math.PI,
        mode: 0,
        nextMode: 50 + Math.random() * 200,
        w: drosWidth,
        h: (drosWidth * 19) / 25,
        src: dros2?.image,
        team: "blue",
      };
    },
  }));

  const tick = () => {
    setTimeout(() => {
      if (!gameActive) return;
      if (!canvasRef.current) return;
      ticks += 1;
      frame();
      requestIdRef.current = requestAnimationFrame(tick);
    }, 1000 / 50);
  };

  const update = () => {
    const dros1 = dros1Ref.current;
    const dros2 = dros2Ref.current;

    updateDros(dros1, dros2);
    updateDros(dros2, dros1);
  };

  const frame = () => {
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.setAttribute("width", String(arenaSize));
    canvasRef.current.setAttribute("height", String(arenaSize));
    update();
    render.call(ctx, dros1Ref.current, dros2Ref.current);
  };

  function updateHealthBar(dros) {
    const hBar = $(".health-bar." + dros.team),
      bar = hBar.find(".bar." + dros.team),
      hit = hBar.find(".hit." + dros.team);
    var total = hBar.data("total"),
      value = hBar.data("value");
    var newValue = dros.health;
    var barWidth = (newValue / total) * 100;
    var hitWidth = ((value - newValue) / value) * 100 + "%";

    hit.css("width", hitWidth);
    hBar.data("value", newValue);

    setTimeout(function () {
      hit.css({ width: "0" });
      bar.css("width", barWidth + "%");
    }, 500);
  }

  function updateDros(dros, opp) {
    if (dros.mode == 0) {
      if (dros.nextMode < 0 && Math.random() < 0.03) {
        dros.mode = 1;
        dros.nextMode = 50 + Math.random() * 50;
      }

      const prob = Math.random();
      if (prob >= 0 && prob < 0.08) dros.theta += 0.6 * Math.random();
      else if (prob >= 0.08 && prob < 0.16) dros.theta -= 0.6 * Math.random();
      else if (prob >= 0.16 && prob < 0.18)
        dros.theta = (dros.theta + Math.PI) % (2 * Math.PI);

      dros.x += dros.mxv * Math.cos(dros.theta);
      dros.y += dros.mxv * Math.sin(dros.theta);
    } else if (dros.mode == 1) {
      if (dros.nextMode < 0) {
        opp.health -= cumDamage[opp.team];
        cumDamage[opp.team] = 0;
        dros.mode = 0;
        dros.nextMode =
          100 +
          Math.random() * 100 +
          ((Math.random() * (10 - dros.spd)) / 2) * 100;
        updateHealthBar(opp);
        if (opp.health <= 0) {
          stopLoop();
        }
      }

      dros.theta = Math.atan2(opp.y - dros.y, opp.x - dros.x);
      dros.x += dros.mxv * 1.7 * Math.cos(dros.theta);
      dros.y += dros.mxv * 1.7 * Math.sin(dros.theta);

      if (checkCollide(dros, opp)) {
        let damage = 0;

        if (Math.random() < dros.crt / 100) damage = dros.atk * 3;
        else damage = dros.atk;

        damage += (dros.stm * ticks) / 2000;

        if (Math.random() < dros.def / 100) damage = 0;

        cumDamage[opp.team] += damage / 300;
      }
    } else if (dros.mode == -1) {
      dros.x += dros.mxv * Math.cos(dros.theta);
      dros.y += dros.mxv * Math.sin(dros.theta);
    }

    dros = checkBounds(dros);
    dros.nextMode -= 1;
  }

  function checkBounds(dros) {
    if (dros.x <= dros.w / 2) {
      if (dros.health <= 0) {
        dros.theta = Math.PI / 2;
        dros.mxv = 40;
      }
      dros.x = dros.w / 2 + 1;
      dros.theta = -Math.PI / 2 + Math.random() * Math.PI;
    }
    if (dros.x + dros.w / 2 >= arenaSize) {
      if (dros.health <= 0) {
        dros.theta = Math.PI / 2;
        dros.mxv = 40;
      }
      dros.x = arenaSize - 2 - dros.w / 2;
      dros.theta = Math.PI / 2 + Math.random() * Math.PI;
    }
    if (dros.y <= dros.h / 2) {
      if (dros.health <= 0) {
        dros.theta = Math.PI / 2;
        dros.mxv = 40;
      }
      dros.y = dros.h / 2 + 1;
      dros.theta = -Math.random() * Math.PI + Math.PI;
    }
    if (dros.y + dros.h / 2 >= arenaSize) {
      if (dros.health <= 0) {
        if (dros.mode == -1 || dros.mode == -2) {
          dros.mode = -2;
          dros.theta += 0.3;
          if (!dros.v) {
            if (dros.theta >= Math.PI / 2 && dros.theta <= (Math.PI * 3) / 2)
              dros.v = -20;
            else dros.v = 20;
          }
          dros.x += dros.v;
        }
        if (dros.x + dros.w / 2 + 4 >= arenaSize || dros.x - 4 <= dros.w / 2)
          dros.mode = -3;
        return dros;
      }
      dros.y = arenaSize - 2 - dros.h / 2;
      dros.theta = Math.PI;
    }

    return dros;
  }

  function checkCollide(dros1, dros2) {
    return (
      dros1.x + dros1.w >= dros2.x &&
      dros2.x + dros2.w >= dros1.x &&
      dros1.y + dros1.h >= dros2.y &&
      dros2.y + dros2.h >= dros1.y
    );
  }

  function render(dros1, dros2) {
    this.clearRect(0, 0, arenaSize, arenaSize);

    renderDros.call(this, dros1);
    renderDros.call(this, dros2);

    renderPointer.call(this, dros1.x, dros1.team, dros1.mode);
    renderPointer.call(this, dros2.x, dros2.team, dros2.mode);

    if (checkCollide(dros1, dros2) && (dros1.mode == 1 || dros2.mode == 1)) {
      // if (ticks - lastTick >= 10) {
      //   lastTick = ticks;
      //   lastTickX = (dros1.x + dros2.x) / 2;
      //   lastTickY = (dros1.y + dros2.y) / 2;
      // }
      // if (ticks - lastTick <= 8) renderAttack.call(this, lastTickX, lastTickY);
      renderAttack.call(this, (dros1.x + dros2.x) / 2, (dros1.y + dros2.y) / 2);
      $(".arena-ring").addClass("shaker");
      $(".arena-ring").addClass("tint");
      setTimeout(() => {
        $(".arena-ring").removeClass("shaker");
        $(".arena-ring").removeClass("tint");
      }, 500);
    }
  }

  function renderDros(dros) {
    const image = new Image();
    image.src = dros.src;
    this.save();
    this.translate(dros.x, dros.y);
    if (dros.theta >= Math.PI / 2 && dros.theta <= (Math.PI * 3) / 2) {
      this.rotate(dros.theta - Math.PI);
    } else {
      this.scale(-1, 1);
      this.rotate(-dros.theta);
    }
    this.drawImage(image, -dros.w / 2, -dros.h / 2, dros.w, dros.h);
    this.restore();
  }

  function renderAttack(x, y, mult = 1) {
    const image = new Image();
    image.src = "./BAM.png";
    this.save();
    this.globalAlpha = 0.3;
    this.translate(x, y);
    this.rotate((Math.random() * Math.PI) / 4 - Math.PI / 8);
    mult = 0.5 + Math.random();
    this.drawImage(
      image,
      (-effectWidth * mult) / 2,
      (-effectHeight * mult) / 2,
      effectWidth * mult,
      effectHeight * mult
    );
    this.restore();
  }

  function renderPointer(x, team, mode) {
    this.beginPath();
    this.lineWidth = "10";
    if (mode == 1) this.lineWidth = "20";
    this.strokeStyle = team;
    this.rect(x - 4, arenaSize, 8, 4);
    this.stroke();
  }

  return (
    <div>
      <div className="health-bar-container">
        <div
          className="health-bar red"
          data-total={dros1Ref?.current?.mxh}
          data-value={dros1Ref?.current?.health}
        >
          <div className="bar red">
            <div className="hit red"></div>
          </div>
        </div>
        <div
          className="health-bar blue"
          data-total={dros2Ref?.current?.mxh}
          data-value={dros2Ref?.current?.health}
        >
          <div className="bar blue">
            <div className="hit blue"></div>
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <h1 className="broadcast-text"></h1>
        <canvas ref={canvasRef} style={{ width: "600px", height: "600px" }} />
      </div>
    </div>
  );
});

export default Ring;
