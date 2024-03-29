// ==UserScript==
// @name         ESP By - THEGUY3DS - Edited By - Livestock43
// @namespace    github.com/Livestock43 / github.com/THEGUY3DS
// @version      1.9.2
// @description  Basic Name ESP Only
// @author       THEGUY3DS (kudos)
// @match        https://krunker.io/*
// @grant        none
// ==/UserScript==

//Note: If you keep getting disconnected mid-game try loading the script then quickly disabling tampermonkey before the game has fully loaded.

let shared_state = new Map(Object.entries({functions_to_hide: new WeakMap(), strings_to_hide: [], hidden_globals: [], init: false}));

let invisible_define = function(obj, key, value) {
    shared_state.get('hidden_globals').push(key);
    Object.defineProperty(obj, key, {
        enumberable: false,
        configurable: false,
        writable: true,
        value: value
    });
};

let conceal_function = function(original_Function, hook_Function) {
    shared_state.get('functions_to_hide').set(hook_Function, original_Function);
};

let conceal_string = function(original_string, hook_string) {
    shared_state.get('strings_to_hide').push({from: new RegExp(hook_string.replace(/([\[|\]|\(|\)|\*|\\|\.|\+])/g,'\\$1'), 'g'), to: original_string});
};

const original_toString = Function.prototype.toString;
let hook_toString = new Proxy(original_toString, {
    apply: function(target, _this, _arguments) {
        try {
            var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }

        let lookup_fn = shared_state.get('functions_to_hide').get(_this);
        if (lookup_fn) {
            return Function.prototype.apply.apply(target, [lookup_fn, _arguments]);
        }

        for (var i = 0; i < shared_state.get('strings_to_hide').length; i++) {
            ret = ret.replace(shared_state.get('strings_to_hide')[i].from, shared_state.get('strings_to_hide')[i].to);
        }
        return ret;
    }
});
Function.prototype.toString = hook_toString;
conceal_function(original_toString, hook_toString);
//

var distance, cnBSeen, canSee, pchObjc, objInstances, isYou, recoilAnimY, mouseDownL, mouseDownR, inputs, getWorldPosition;
console.json = object => console.log(JSON.stringify(object, undefined, 2));
const defined = object => typeof object !== "undefined";

const original_encode = TextEncoder.prototype.encode;
let hook_encode = new Proxy(original_encode, {
    apply: function(target, _this, _arguments) {
        let game = false;
        try {
            if (_arguments[0].length > 1000) {
                cnBSeen = _arguments[0].match(/this\['recon']=!0x1,this\['(\w+)']=!0x1/)[1];
                canSee = _arguments[0].match(/,this\['(\w+)'\]=function\(\w+,\w+,\w+,\w+,\w+\){if\(!\w+\)return!\w+;/)[1];
                pchObjc = _arguments[0].match(/\(\w+,\w+,\w+\),this\['(\w+)'\]=new \w+\['\w+'\]\(\)/)[1];
                objInstances = _arguments[0].match(/\[\w+\]\['\w+'\]=!\w+,this\['\w+'\]\[\w+\]\['\w+'\]&&\(this\['\w+'\]\[\w+\]\['(\w+)'\]\['\w+'\]=!\w+/)[1];
                isYou = _arguments[0].match(/,this\['\w+'\]=!\w+,this\['\w+'\]=!\w+,this\['(\w+)'\]=\w+,this\['\w+'\]\['length'\]=\w+,this\[/)[1];
                recoilAnimY = _arguments[0].match(/\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*1,this\['\w+'\]=\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,/)[1];
                mouseDownL = _arguments[0].match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[1];
                mouseDownR = _arguments[0].match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[2];
                inputs = _arguments[0].match(/\(\w+,\w*1\)\),\w+\['\w+'\]=\w*0,\w+\['\w+'\]=\w*0,!(\w+)\['\w+'\]&&\w+\['\w+'\]\['push'\]\((\w+)\),(\w+)\['\w+'\]/)[2];
                getWorldPosition = _arguments[0].match(/\['camera']\['(\w+)']\(\);if/)[1]

                game = true;
            }

        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }
        if (game) TextEncoder.prototype.encode = original_encode;

        return Function.prototype.apply.apply(target, [_this, _arguments]);
    }
}); TextEncoder.prototype.encode = hook_encode;
conceal_function(original_encode, hook_encode);

let render = function() {

    //DEFINES
    const args = arguments.callee.caller.caller.arguments;
    const me = args[3];
    if (!me) return;
    const scale = args[0];
    const world = args[1];
    const renderer = args[2];
    const scale2 = args[4];
    const canvas = document.getElementById('game-overlay');
    const ctx = canvas.getContext("2d");
    const consts = {
        "cameraHeight": 1.5,
        "playerHeight": 11,
        "cameraHeight": 1.5,
        "headScale": 2,
        "crouchDst": 3,
        "camChaseTrn": 0.0022,
        "camChaseSpd": 0.0012,
        "camChaseSen": 0.2,
        "camChaseDst": 24,
        "recoilMlt": 0.3,
        "nameOffset": 0.6,
        "nameOffsetHat": 0.8,
    };
    const fonts = {
        ssBig: '30px\x20Sans-serif',
        ssSmall: '20px\x20Sans-serif',
        gmBig: '30px\x20GameFont',
        gmSmall: '20px\x20GameFont'
    }
    console.dir(window)
    let fullWidth = window.innerWidth;
    let fullHeight = window.innerHeight;
    let scaledWidth = canvas.width / scale;
    let scaledHeight = canvas.height / scale;
    let camPos = renderer['camera'][getWorldPosition]();
    const Pi = Math.PI / 2;
    const PI2 = 2 * Math.PI;
    let controls = world.controls;
    let players = world.players.list;
    let entities = players.filter(x => { return x.active && !x[isYou] });


     //FUNCTIONS
     let getDistance3D = (fromX, fromY, fromZ, toX, toY, toZ) => {
        var distX = fromX - toX,
            distY = fromY - toY,
            distZ = fromZ - toZ;
        return Math.sqrt(distX * distX + distY * distY + distZ * distZ);
    }

    let getDistance = (player1, player2) => {
        return getDistance3D(player1.x, player1.y, player1.z, player2.x, player2.y, player2.z);
    }

    let getDirection = (fromZ, fromX, toZ, toX) => {
        return Math.atan2(fromX - toX, fromZ - toZ);
    }

    let getXDir = (fromX, fromY, fromZ, toX, toY, toZ) => {
        var dirY = Math.abs(fromY - toY),
            dist = getDistance3D(fromX, fromY, fromZ, toX, toY, toZ);
        return Math.asin(dirY / dist) * (fromY > toY ? -1 : 1);
    }

    let getAngleDist = (start, end) => {
        return Math.atan2(Math.sin(end - start), Math.cos(start - end));
    }

    let get = (entity, string) => {
        if (defined(entity) && entity && entity.active) {
            switch (string) {
                case 'isYou': return entity[isYou];
                case 'objInstances': return entity[objInstances];
                case 'inView': return null == world[canSee](me, entity.x, entity.y - entity.crouchVal * consts.crouchDst, entity.z) ;//|| entity[cnBSeen];
                case 'isFriendly': return (me && me.team ? me.team : me.spectating ? 0x1 : 0x0) == entity.team;
                case 'recoilAnimY': return entity[recoilAnimY];
            }
        }
        return null;
    }

    let getTarget = () => {
        if (!defined (distance)) distance = Infinity;
        for (const entity of players.filter(x => { return x.active && !get(x,"isYou") && get(x,"inView") && !get(x,"isFriendly") && x.health > 0})) {
            if (defined(entity[objInstances])) {
                const entityPos = entity[objInstances].position;
                if (renderer.frustum.containsPoint(entityPos)) {
                    const dist = entityPos.distanceTo(me);
                    if (dist <= distance) {
                        me.distance = dist;
                        return entity;
                    }
                }
            }
        }
        distance = Infinity;
        return null;
    }

    let camLookAt = (target) => {
        if (!defined(controls) || target === null || (target.x + target.y + target.z2) == 0) return void(controls.target = null);
        let offset1 = ((consts.playerHeight - consts.cameraHeight) - (target.crouchVal * consts.crouchDst));
        let offset2 = consts.playerHeight - consts.headScale / 2 - target.crouchVal * consts.crouchDst;
        let recoil = (get(me, "recoilAnimY") * consts.recoilMlt) * 25;
        let xdir = getXDir(controls.object.position.x, controls.object.position.y, controls.object.position.z, target.x, (target.y + offset1) - recoil, target.z);
        let ydir = getDirection(controls.object.position.z, controls.object.position.x, target.z, target.x);
        controls.target = {
            xD:xdir,
            yD: ydir,
            x: target.x + consts.camChaseDst * Math.sin(ydir) * Math.cos(xdir),
            y: target.y - consts.camChaseDst * Math.sin(xdir),
            z: target.z + consts.camChaseDst * Math.cos(ydir) * Math.cos(xdir)
        }
    }

    let world2Screen = (camera, position) => {
        let pos = position.clone();
        pos.project(camera);
        pos.x = (pos.x + 1) / 2;
        pos.y = (-pos.y + 1) / 2;
        pos.x *= scaledWidth;
        pos.y *= scaledHeight;
        return pos;
    }

    let pixelTranslate = (ctx, x, y) => {
        ctx.translate(~~x, ~~y);
    }

    let pixelDifference = (pos1, Pos2, multi) => {
        const hDiff = ~~(pos1.y - Pos2.y);
        return [hDiff, ~~(hDiff * multi)]
    }

    let text = (txt, font, color, x, y) => {
        ctx.save();
        pixelTranslate(ctx, x, y);
        ctx.fillStyle = color;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.font = font;
        ctx.lineWidth = 1;
        ctx.strokeText(txt, 0, 0);
        ctx.fillText(txt, 0, 0);
        ctx.restore();
    }

    let rect = (x, y, ox, oy, w, h, color, fill) => {
        ctx.save();
        pixelTranslate(ctx, x, y);
        ctx.beginPath();
        fill ? ctx.fillStyle = color : ctx.strokeStyle = color;
        ctx.rect(ox, oy, w, h);
        fill ? ctx.fill() : ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    let line = (x1, y1, x2, y2, lW, sS) => {
        ctx.save();
        ctx.lineWidth = lW + 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
        ctx.stroke();
        ctx.lineWidth = lW;
        ctx.strokeStyle = sS;
        ctx.stroke();
        ctx.restore();
    }

    let image = (x, y, img, ox, oy, w, h) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.drawImage(img, ox, oy, w, h);
        ctx.closePath();
        ctx.restore();
    }

    let getTextMeasurements = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = ~~ctx.measureText(arr[i]).width;
        }
        return arr;
    }

    let byte2Hex = (n) => {
        var chars = "0123456789ABCDEF";
        return String(chars.substr((n >> 4) & 0x0F,1)) + chars.substr(n & 0x0F,1);
    }

    let rgba2hex = (r,g,b,a = 255) => ("#").concat(byte2Hex(r),byte2Hex(g),byte2Hex(b),byte2Hex(a));
    //ESP Only
    entities.map((entity, index, array)=> {
        if (defined(entity[objInstances])) {
/*
            let isFriendly = get(entity, 'isFriendly');
            let teamCol = isFriendly ? '#44AAFF' : '#FF4444';
            let entityPos = entity[objInstances].position;
            if (renderer.frustum.containsPoint(entityPos)) {
                let entitynamePos = entityPos.clone().setY(entityPos.y + (consts.playerHeight + (0x0 <= entity.hatIndex ? consts.nameOffsetHat : 0) + consts.nameOffset - entity.crouchVal * consts.crouchDst));
                let entityScrPosName = entitynamePos.clone();
                let playerScaled = Math.max(0.3, 1 - camPos.distanceTo(entityScrPosName) / 600);
                let entityScrPosBase = world2Screen(renderer.camera, entityPos);
                let entityScrPosHead = world2Screen(renderer.camera, entityPos.setY(entityPos.y + consts.playerHeight - entity.crouchVal * consts.crouchDst));
                let entityScrPxlDiff = pixelDifference(entityScrPosBase, entityScrPosHead, 0.6);
                //2d
                //rect(entityScrPosHead.x - entityScrPxlDiff[1] / 2, entityScrPosHead.y, 0, 0, entityScrPxlDiff[1], entityScrPxlDiff[0], teamCol, false);
                //Tracers
                //line(fullWidth / 2, fullHeight - (fullHeight - scaledHeight), entityScrPosBase.x, entityScrPosBase.y, 2.5, teamCol);
*/
                //Chams [Off]
                entity[cnBSeen] = true;
                for (let i = 0; i < entity[objInstances].children.length; i++) {
                    const object3d = entity[objInstances].children[i];
                    for (let j = 0; j < object3d.children.length; j++) {
                        const mesh = object3d.children[j];
                        if (mesh && mesh.type == "Mesh") {
                            //const material = mesh.material;
                            //material.depthTest = false;
                            //material.fog = false;
                            //material.emissive.r = 1;
                            //material.colorWrite = true;
                            //material.transparent = true;
                            //material.opacity = 1.0;
                            //material.needsUpdate = true;
                            //material.wireframe = !canHit(entity);
                        }
                    }
                }
            }
        //}
    });
};
const clearRect = CanvasRenderingContext2D.prototype.clearRect;
const original_clearRect = CanvasRenderingContext2D.prototype.scale;
let hook_clearRect = new Proxy(original_clearRect, {
    apply: function(target, _this, _arguments) {
        try {
            var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }

        render(_this);

        return ret;
    }
}); CanvasRenderingContext2D.prototype.scale = hook_clearRect;
conceal_function(original_clearRect, hook_clearRect);