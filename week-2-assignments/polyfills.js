var globalObj =
  typeof globalThis !== "undefined" ? globalThis :
  typeof window !== "undefined" ? window :
  typeof self !== "undefined" ? self :
  Function("return this")();

// ---------- apply ----------
Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError("myApply must be called on a function");
  }
  context = (context === null || context === undefined) ? globalObj : Object(context);

  var key = "__fn_" + Math.random().toString(36).slice(2);
  context[key] = this;

  var result;
  if (args === null || args === undefined) {
    result = context[key]();
  } else {
    // Build "args[0],args[1],..." since we can't spread in ES5
    var list = [];
    for (var i = 0; i < args.length; i++) list.push("args[" + i + "]");
    result = eval("context[key](" + list.join(",") + ")");
  }

  delete context[key];
  return result;
};

// ---------- call ----------
Function.prototype.myCall = function (context) {
  return this.myApply(context, Array.prototype.slice.call(arguments, 1));
};

// ---------- bind ----------
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }
  var originalFn = this;
  var boundArgs = Array.prototype.slice.call(arguments, 1);

  function boundFn() {
    var callArgs = Array.prototype.slice.call(arguments);
    return originalFn.apply(
      this instanceof boundFn ? this : context,
      boundArgs.concat(callArgs)
    );
  }

  if (originalFn.prototype) {
    boundFn.prototype = Object.create(originalFn.prototype); // ES5, IE9+
  }
  return boundFn;
};