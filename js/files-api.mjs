import { o as logger } from "./chunks/dav-DY_3WIBa.mjs";
import { q, F, s, N, t, P, c, l, m, n, a, g, p, b, r, d, h, f, k, j, e, i } from "./chunks/dav-DY_3WIBa.mjs";
import { getCapabilities } from "@nextcloud/capabilities";
import { extname, basename } from "path";
import { getCanonicalLocale, getLanguage } from "@nextcloud/l10n";
import { TypedEventTarget } from "typescript-event-target";
import require$$1 from "string_decoder";
var NewMenuEntryCategory = /* @__PURE__ */ ((NewMenuEntryCategory2) => {
  NewMenuEntryCategory2[NewMenuEntryCategory2["UploadFromDevice"] = 0] = "UploadFromDevice";
  NewMenuEntryCategory2[NewMenuEntryCategory2["CreateNew"] = 1] = "CreateNew";
  NewMenuEntryCategory2[NewMenuEntryCategory2["Other"] = 2] = "Other";
  return NewMenuEntryCategory2;
})(NewMenuEntryCategory || {});
class NewFileMenu {
  _entries = [];
  registerEntry(entry) {
    this.validateEntry(entry);
    entry.category = entry.category ?? 1;
    this._entries.push(entry);
  }
  unregisterEntry(entry) {
    const entryIndex = typeof entry === "string" ? this.getEntryIndex(entry) : this.getEntryIndex(entry.id);
    if (entryIndex === -1) {
      logger.warn("Entry not found, nothing removed", { entry, entries: this.getEntries() });
      return;
    }
    this._entries.splice(entryIndex, 1);
  }
  /**
   * Get the list of registered entries
   *
   * @param {Folder} context the creation context. Usually the current folder
   */
  getEntries(context) {
    if (context) {
      return this._entries.filter((entry) => typeof entry.enabled === "function" ? entry.enabled(context) : true);
    }
    return this._entries;
  }
  getEntryIndex(id) {
    return this._entries.findIndex((entry) => entry.id === id);
  }
  validateEntry(entry) {
    if (!entry.id || !entry.displayName || !(entry.iconSvgInline || entry.iconClass) || !entry.handler) {
      throw new Error("Invalid entry");
    }
    if (typeof entry.id !== "string" || typeof entry.displayName !== "string") {
      throw new Error("Invalid id or displayName property");
    }
    if (entry.iconClass && typeof entry.iconClass !== "string" || entry.iconSvgInline && typeof entry.iconSvgInline !== "string") {
      throw new Error("Invalid icon provided");
    }
    if (entry.enabled !== void 0 && typeof entry.enabled !== "function") {
      throw new Error("Invalid enabled property");
    }
    if (typeof entry.handler !== "function") {
      throw new Error("Invalid handler property");
    }
    if ("order" in entry && typeof entry.order !== "number") {
      throw new Error("Invalid order property");
    }
    if (this.getEntryIndex(entry.id) !== -1) {
      throw new Error("Duplicate entry");
    }
  }
}
const getNewFileMenu = function() {
  if (typeof window._nc_newfilemenu === "undefined") {
    window._nc_newfilemenu = new NewFileMenu();
    logger.debug("NewFileMenu initialized");
  }
  return window._nc_newfilemenu;
};
var DefaultType = /* @__PURE__ */ ((DefaultType2) => {
  DefaultType2["DEFAULT"] = "default";
  DefaultType2["HIDDEN"] = "hidden";
  return DefaultType2;
})(DefaultType || {});
class FileAction {
  _action;
  constructor(action) {
    this.validateAction(action);
    this._action = action;
  }
  get id() {
    return this._action.id;
  }
  get displayName() {
    return this._action.displayName;
  }
  get title() {
    return this._action.title;
  }
  get iconSvgInline() {
    return this._action.iconSvgInline;
  }
  get enabled() {
    return this._action.enabled;
  }
  get exec() {
    return this._action.exec;
  }
  get execBatch() {
    return this._action.execBatch;
  }
  get order() {
    return this._action.order;
  }
  get parent() {
    return this._action.parent;
  }
  get default() {
    return this._action.default;
  }
  get destructive() {
    return this._action.destructive;
  }
  get inline() {
    return this._action.inline;
  }
  get renderInline() {
    return this._action.renderInline;
  }
  validateAction(action) {
    if (!action.id || typeof action.id !== "string") {
      throw new Error("Invalid id");
    }
    if (!action.displayName || typeof action.displayName !== "function") {
      throw new Error("Invalid displayName function");
    }
    if ("title" in action && typeof action.title !== "function") {
      throw new Error("Invalid title function");
    }
    if (!action.iconSvgInline || typeof action.iconSvgInline !== "function") {
      throw new Error("Invalid iconSvgInline function");
    }
    if (!action.exec || typeof action.exec !== "function") {
      throw new Error("Invalid exec function");
    }
    if ("enabled" in action && typeof action.enabled !== "function") {
      throw new Error("Invalid enabled function");
    }
    if ("execBatch" in action && typeof action.execBatch !== "function") {
      throw new Error("Invalid execBatch function");
    }
    if ("order" in action && typeof action.order !== "number") {
      throw new Error("Invalid order");
    }
    if (action.destructive !== void 0 && typeof action.destructive !== "boolean") {
      throw new Error("Invalid destructive flag");
    }
    if ("parent" in action && typeof action.parent !== "string") {
      throw new Error("Invalid parent");
    }
    if (action.default && !Object.values(DefaultType).includes(action.default)) {
      throw new Error("Invalid default");
    }
    if ("inline" in action && typeof action.inline !== "function") {
      throw new Error("Invalid inline function");
    }
    if ("renderInline" in action && typeof action.renderInline !== "function") {
      throw new Error("Invalid renderInline function");
    }
  }
}
const registerFileAction = function(action) {
  if (typeof window._nc_fileactions === "undefined") {
    window._nc_fileactions = [];
    logger.debug("FileActions initialized");
  }
  if (window._nc_fileactions.find((search) => search.id === action.id)) {
    logger.error(`FileAction ${action.id} already registered`, { action });
    return;
  }
  window._nc_fileactions.push(action);
};
const getFileActions = function() {
  if (typeof window._nc_fileactions === "undefined") {
    window._nc_fileactions = [];
    logger.debug("FileActions initialized");
  }
  return window._nc_fileactions;
};
class FileListAction {
  _action;
  constructor(action) {
    this.validateAction(action);
    this._action = action;
  }
  get id() {
    return this._action.id;
  }
  get displayName() {
    return this._action.displayName;
  }
  get iconSvgInline() {
    return this._action.iconSvgInline;
  }
  get order() {
    return this._action.order;
  }
  get enabled() {
    return this._action.enabled;
  }
  get exec() {
    return this._action.exec;
  }
  validateAction(action) {
    if (!action.id || typeof action.id !== "string") {
      throw new Error("Invalid id");
    }
    if (!action.displayName || typeof action.displayName !== "function") {
      throw new Error("Invalid displayName function");
    }
    if ("iconSvgInline" in action && typeof action.iconSvgInline !== "function") {
      throw new Error("Invalid iconSvgInline function");
    }
    if ("order" in action && typeof action.order !== "number") {
      throw new Error("Invalid order");
    }
    if ("enabled" in action && typeof action.enabled !== "function") {
      throw new Error("Invalid enabled function");
    }
    if (!action.exec || typeof action.exec !== "function") {
      throw new Error("Invalid exec function");
    }
  }
}
const registerFileListAction = (action) => {
  if (typeof window._nc_filelistactions === "undefined") {
    window._nc_filelistactions = [];
  }
  if (window._nc_filelistactions.find((listAction) => listAction.id === action.id)) {
    logger.error(`FileListAction with id "${action.id}" is already registered`, { action });
    return;
  }
  window._nc_filelistactions.push(action);
};
const getFileListActions = () => {
  if (typeof window._nc_filelistactions === "undefined") {
    window._nc_filelistactions = [];
  }
  return window._nc_filelistactions;
};
class Header {
  _header;
  constructor(header) {
    this.validateHeader(header);
    this._header = header;
  }
  get id() {
    return this._header.id;
  }
  get order() {
    return this._header.order;
  }
  get enabled() {
    return this._header.enabled;
  }
  get render() {
    return this._header.render;
  }
  get updated() {
    return this._header.updated;
  }
  validateHeader(header) {
    if (!header.id || !header.render || !header.updated) {
      throw new Error("Invalid header: id, render and updated are required");
    }
    if (typeof header.id !== "string") {
      throw new Error("Invalid id property");
    }
    if (header.enabled !== void 0 && typeof header.enabled !== "function") {
      throw new Error("Invalid enabled property");
    }
    if (header.render && typeof header.render !== "function") {
      throw new Error("Invalid render property");
    }
    if (header.updated && typeof header.updated !== "function") {
      throw new Error("Invalid updated property");
    }
  }
}
const registerFileListHeaders = function(header) {
  if (typeof window._nc_filelistheader === "undefined") {
    window._nc_filelistheader = [];
    logger.debug("FileListHeaders initialized");
  }
  if (window._nc_filelistheader.find((search) => search.id === header.id)) {
    logger.error(`Header ${header.id} already registered`, { header });
    return;
  }
  window._nc_filelistheader.push(header);
};
const getFileListHeaders = function() {
  if (typeof window._nc_filelistheader === "undefined") {
    window._nc_filelistheader = [];
    logger.debug("FileListHeaders initialized");
  }
  return window._nc_filelistheader;
};
var InvalidFilenameErrorReason = /* @__PURE__ */ ((InvalidFilenameErrorReason2) => {
  InvalidFilenameErrorReason2["ReservedName"] = "reserved name";
  InvalidFilenameErrorReason2["Character"] = "character";
  InvalidFilenameErrorReason2["Extension"] = "extension";
  return InvalidFilenameErrorReason2;
})(InvalidFilenameErrorReason || {});
class InvalidFilenameError extends Error {
  constructor(options) {
    super(`Invalid ${options.reason} '${options.segment}' in filename '${options.filename}'`, { cause: options });
  }
  /**
   * The filename that was validated
   */
  get filename() {
    return this.cause.filename;
  }
  /**
   * Reason why the validation failed
   */
  get reason() {
    return this.cause.reason;
  }
  /**
   * Part of the filename that caused this error
   */
  get segment() {
    return this.cause.segment;
  }
}
function validateFilename(filename) {
  const capabilities = getCapabilities().files;
  const forbiddenCharacters = capabilities.forbidden_filename_characters ?? window._oc_config?.forbidden_filenames_characters ?? ["/", "\\"];
  for (const character of forbiddenCharacters) {
    if (filename.includes(character)) {
      throw new InvalidFilenameError({ segment: character, reason: "character", filename });
    }
  }
  filename = filename.toLocaleLowerCase();
  const forbiddenFilenames = capabilities.forbidden_filenames ?? [".htaccess"];
  if (forbiddenFilenames.includes(filename)) {
    throw new InvalidFilenameError({
      filename,
      segment: filename,
      reason: "reserved name"
      /* ReservedName */
    });
  }
  const endOfBasename = filename.indexOf(".", 1);
  const basename2 = filename.substring(0, endOfBasename === -1 ? void 0 : endOfBasename);
  const forbiddenFilenameBasenames = capabilities.forbidden_filename_basenames ?? [];
  if (forbiddenFilenameBasenames.includes(basename2)) {
    throw new InvalidFilenameError({
      filename,
      segment: basename2,
      reason: "reserved name"
      /* ReservedName */
    });
  }
  const forbiddenFilenameExtensions = capabilities.forbidden_filename_extensions ?? [".part", ".filepart"];
  for (const extension of forbiddenFilenameExtensions) {
    if (filename.length > extension.length && filename.endsWith(extension)) {
      throw new InvalidFilenameError({ segment: extension, reason: "extension", filename });
    }
  }
}
function isFilenameValid(filename) {
  try {
    validateFilename(filename);
    return true;
  } catch (error) {
    if (error instanceof InvalidFilenameError) {
      return false;
    }
    throw error;
  }
}
function getUniqueName(name, otherNames, options) {
  const opts = {
    suffix: (n2) => `(${n2})`,
    ignoreFileExtension: false,
    ...options
  };
  let newName = name;
  let i2 = 1;
  while (otherNames.includes(newName)) {
    const ext = opts.ignoreFileExtension ? "" : extname(name);
    const base = basename(name, ext);
    newName = `${base} ${opts.suffix(i2++)}${ext}`;
  }
  return newName;
}
const humanList = ["B", "KB", "MB", "GB", "TB", "PB"];
const humanListBinary = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
function formatFileSize(size, skipSmallSizes = false, binaryPrefixes = false, base1000 = false) {
  binaryPrefixes = binaryPrefixes && !base1000;
  if (typeof size === "string") {
    size = Number(size);
  }
  let order = size > 0 ? Math.floor(Math.log(size) / Math.log(base1000 ? 1e3 : 1024)) : 0;
  order = Math.min((binaryPrefixes ? humanListBinary.length : humanList.length) - 1, order);
  const readableFormat = binaryPrefixes ? humanListBinary[order] : humanList[order];
  let relativeSize = (size / Math.pow(base1000 ? 1e3 : 1024, order)).toFixed(1);
  if (skipSmallSizes === true && order === 0) {
    return (relativeSize !== "0.0" ? "< 1 " : "0 ") + (binaryPrefixes ? humanListBinary[1] : humanList[1]);
  }
  if (order < 2) {
    relativeSize = parseFloat(relativeSize).toFixed(0);
  } else {
    relativeSize = parseFloat(relativeSize).toLocaleString(getCanonicalLocale());
  }
  return relativeSize + " " + readableFormat;
}
function parseFileSize(value, forceBinary = false) {
  try {
    value = `${value}`.toLocaleLowerCase().replaceAll(/\s+/g, "").replaceAll(",", ".");
  } catch (e2) {
    return null;
  }
  const match = value.match(/^([0-9]*(\.[0-9]*)?)([kmgtp]?)(i?)b?$/);
  if (match === null || match[1] === "." || match[1] === "") {
    return null;
  }
  const bytesArray = {
    "": 0,
    k: 1,
    m: 2,
    g: 3,
    t: 4,
    p: 5,
    e: 6
  };
  const decimalString = `${match[1]}`;
  const base = match[4] === "i" || forceBinary ? 1024 : 1e3;
  return Math.round(Number.parseFloat(decimalString) * base ** bytesArray[match[3]]);
}
function stringify(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}
function orderBy(collection, identifiers2, orders) {
  identifiers2 = identifiers2 ?? [(value) => value];
  orders = orders ?? [];
  const sorting = identifiers2.map((_, index) => (orders[index] ?? "asc") === "asc" ? 1 : -1);
  const collator = Intl.Collator(
    [getLanguage(), getCanonicalLocale()],
    {
      // handle 10 as ten and not as one-zero
      numeric: true,
      usage: "sort"
    }
  );
  return [...collection].sort((a2, b2) => {
    for (const [index, identifier] of identifiers2.entries()) {
      const value = collator.compare(stringify(identifier(a2)), stringify(identifier(b2)));
      if (value !== 0) {
        return value * sorting[index];
      }
    }
    return 0;
  });
}
var FilesSortingMode = /* @__PURE__ */ ((FilesSortingMode2) => {
  FilesSortingMode2["Name"] = "basename";
  FilesSortingMode2["Modified"] = "mtime";
  FilesSortingMode2["Size"] = "size";
  return FilesSortingMode2;
})(FilesSortingMode || {});
function sortNodes(nodes, options = {}) {
  const sortingOptions = {
    // Default to sort by name
    sortingMode: "basename",
    // Default to sort ascending
    sortingOrder: "asc",
    ...options
  };
  const basename2 = (name) => name.lastIndexOf(".") > 0 ? name.slice(0, name.lastIndexOf(".")) : name;
  const identifiers2 = [
    // 1: Sort favorites first if enabled
    ...sortingOptions.sortFavoritesFirst ? [(v) => v.attributes?.favorite !== 1] : [],
    // 2: Sort folders first if sorting by name
    ...sortingOptions.sortFoldersFirst ? [(v) => v.type !== "folder"] : [],
    // 3: Use sorting mode if NOT basename (to be able to use display name too)
    ...sortingOptions.sortingMode !== "basename" ? [(v) => v[sortingOptions.sortingMode]] : [],
    // 4: Use display name if available, fallback to name
    (v) => basename2(v.displayname || v.attributes?.displayname || v.basename || ""),
    // 5: Finally, use basename if all previous sorting methods failed
    (v) => v.basename
  ];
  const orders = [
    // (for 1): always sort favorites before normal files
    ...sortingOptions.sortFavoritesFirst ? ["asc"] : [],
    // (for 2): always sort folders before files
    ...sortingOptions.sortFoldersFirst ? ["asc"] : [],
    // (for 3): Reverse if sorting by mtime as mtime higher means edited more recent -> lower
    ...sortingOptions.sortingMode === "mtime" ? [sortingOptions.sortingOrder === "asc" ? "desc" : "asc"] : [],
    // (also for 3 so make sure not to conflict with 2 and 3)
    ...sortingOptions.sortingMode !== "mtime" && sortingOptions.sortingMode !== "basename" ? [sortingOptions.sortingOrder] : [],
    // for 4: use configured sorting direction
    sortingOptions.sortingOrder,
    // for 5: use configured sorting direction
    sortingOptions.sortingOrder
  ];
  return orderBy(nodes, identifiers2, orders);
}
class Navigation extends TypedEventTarget {
  _views = [];
  _currentView = null;
  /**
   * Register a new view on the navigation
   * @param view The view to register
   * @throws `Error` is thrown if a view with the same id is already registered
   */
  register(view) {
    if (this._views.find((search) => search.id === view.id)) {
      throw new Error(`View id ${view.id} is already registered`);
    }
    this._views.push(view);
    this.dispatchTypedEvent("update", new CustomEvent("update"));
  }
  /**
   * Remove a registered view
   * @param id The id of the view to remove
   */
  remove(id) {
    const index = this._views.findIndex((view) => view.id === id);
    if (index !== -1) {
      this._views.splice(index, 1);
      this.dispatchTypedEvent("update", new CustomEvent("update"));
    }
  }
  /**
   * Set the currently active view
   * @fires UpdateActiveViewEvent
   * @param view New active view
   */
  setActive(view) {
    this._currentView = view;
    const event = new CustomEvent("updateActive", { detail: view });
    this.dispatchTypedEvent("updateActive", event);
  }
  /**
   * The currently active files view
   */
  get active() {
    return this._currentView;
  }
  /**
   * All registered views
   */
  get views() {
    return this._views;
  }
}
const getNavigation = function() {
  if (typeof window._nc_navigation === "undefined") {
    window._nc_navigation = new Navigation();
    logger.debug("Navigation service initialized");
  }
  return window._nc_navigation;
};
class Column {
  _column;
  constructor(column) {
    isValidColumn(column);
    this._column = column;
  }
  get id() {
    return this._column.id;
  }
  get title() {
    return this._column.title;
  }
  get render() {
    return this._column.render;
  }
  get sort() {
    return this._column.sort;
  }
  get summary() {
    return this._column.summary;
  }
}
const isValidColumn = function(column) {
  if (!column.id || typeof column.id !== "string") {
    throw new Error("A column id is required");
  }
  if (!column.title || typeof column.title !== "string") {
    throw new Error("A column title is required");
  }
  if (!column.render || typeof column.render !== "function") {
    throw new Error("A render function is required");
  }
  if (column.sort && typeof column.sort !== "function") {
    throw new Error("Column sortFunction must be a function");
  }
  if (column.summary && typeof column.summary !== "function") {
    throw new Error("Column summary must be a function");
  }
  return true;
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var sax$1 = {};
var hasRequiredSax;
function requireSax() {
  if (hasRequiredSax) return sax$1;
  hasRequiredSax = 1;
  (function(exports) {
    (function(sax2) {
      sax2.parser = function(strict, opt) {
        return new SAXParser(strict, opt);
      };
      sax2.SAXParser = SAXParser;
      sax2.SAXStream = SAXStream;
      sax2.createStream = createStream;
      sax2.MAX_BUFFER_LENGTH = 64 * 1024;
      var buffers = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      sax2.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) {
          return new SAXParser(strict, opt);
        }
        var parser = this;
        clearBuffers(parser);
        parser.q = parser.c = "";
        parser.bufferCheckPosition = sax2.MAX_BUFFER_LENGTH;
        parser.opt = opt || {};
        parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
        parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
        parser.tags = [];
        parser.closed = parser.closedRoot = parser.sawRoot = false;
        parser.tag = parser.error = null;
        parser.strict = !!strict;
        parser.noscript = !!(strict || parser.opt.noscript);
        parser.state = S.BEGIN;
        parser.strictEntities = parser.opt.strictEntities;
        parser.ENTITIES = parser.strictEntities ? Object.create(sax2.XML_ENTITIES) : Object.create(sax2.ENTITIES);
        parser.attribList = [];
        if (parser.opt.xmlns) {
          parser.ns = Object.create(rootNS);
        }
        if (parser.opt.unquotedAttributeValues === void 0) {
          parser.opt.unquotedAttributeValues = !strict;
        }
        parser.trackPosition = parser.opt.position !== false;
        if (parser.trackPosition) {
          parser.position = parser.line = parser.column = 0;
        }
        emit2(parser, "onready");
      }
      if (!Object.create) {
        Object.create = function(o) {
          function F2() {
          }
          F2.prototype = o;
          var newf = new F2();
          return newf;
        };
      }
      if (!Object.keys) {
        Object.keys = function(o) {
          var a2 = [];
          for (var i2 in o) if (o.hasOwnProperty(i2)) a2.push(i2);
          return a2;
        };
      }
      function checkBufferLength(parser) {
        var maxAllowed = Math.max(sax2.MAX_BUFFER_LENGTH, 10);
        var maxActual = 0;
        for (var i2 = 0, l2 = buffers.length; i2 < l2; i2++) {
          var len = parser[buffers[i2]].length;
          if (len > maxAllowed) {
            switch (buffers[i2]) {
              case "textNode":
                closeText(parser);
                break;
              case "cdata":
                emitNode(parser, "oncdata", parser.cdata);
                parser.cdata = "";
                break;
              case "script":
                emitNode(parser, "onscript", parser.script);
                parser.script = "";
                break;
              default:
                error(parser, "Max buffer length exceeded: " + buffers[i2]);
            }
          }
          maxActual = Math.max(maxActual, len);
        }
        var m2 = sax2.MAX_BUFFER_LENGTH - maxActual;
        parser.bufferCheckPosition = m2 + parser.position;
      }
      function clearBuffers(parser) {
        for (var i2 = 0, l2 = buffers.length; i2 < l2; i2++) {
          parser[buffers[i2]] = "";
        }
      }
      function flushBuffers(parser) {
        closeText(parser);
        if (parser.cdata !== "") {
          emitNode(parser, "oncdata", parser.cdata);
          parser.cdata = "";
        }
        if (parser.script !== "") {
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
      }
      SAXParser.prototype = {
        end: function() {
          end(this);
        },
        write,
        resume: function() {
          this.error = null;
          return this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          flushBuffers(this);
        }
      };
      var Stream;
      try {
        Stream = require("stream").Stream;
      } catch (ex) {
        Stream = function() {
        };
      }
      if (!Stream) Stream = function() {
      };
      var streamWraps = sax2.EVENTS.filter(function(ev) {
        return ev !== "error" && ev !== "end";
      });
      function createStream(strict, opt) {
        return new SAXStream(strict, opt);
      }
      function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) {
          return new SAXStream(strict, opt);
        }
        Stream.apply(this);
        this._parser = new SAXParser(strict, opt);
        this.writable = true;
        this.readable = true;
        var me = this;
        this._parser.onend = function() {
          me.emit("end");
        };
        this._parser.onerror = function(er) {
          me.emit("error", er);
          me._parser.error = null;
        };
        this._decoder = null;
        streamWraps.forEach(function(ev) {
          Object.defineProperty(me, "on" + ev, {
            get: function() {
              return me._parser["on" + ev];
            },
            set: function(h2) {
              if (!h2) {
                me.removeAllListeners(ev);
                me._parser["on" + ev] = h2;
                return h2;
              }
              me.on(ev, h2);
            },
            enumerable: true,
            configurable: false
          });
        });
      }
      SAXStream.prototype = Object.create(Stream.prototype, {
        constructor: {
          value: SAXStream
        }
      });
      SAXStream.prototype.write = function(data) {
        if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
          if (!this._decoder) {
            var SD = require$$1.StringDecoder;
            this._decoder = new SD("utf8");
          }
          data = this._decoder.write(data);
        }
        this._parser.write(data.toString());
        this.emit("data", data);
        return true;
      };
      SAXStream.prototype.end = function(chunk) {
        if (chunk && chunk.length) {
          this.write(chunk);
        }
        this._parser.end();
        return true;
      };
      SAXStream.prototype.on = function(ev, handler) {
        var me = this;
        if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
          me._parser["on" + ev] = function() {
            var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
            args.splice(0, 0, ev);
            me.emit.apply(me, args);
          };
        }
        return Stream.prototype.on.call(me, ev, handler);
      };
      var CDATA = "[CDATA[";
      var DOCTYPE = "DOCTYPE";
      var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
      var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
      var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
      var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function isWhitespace(c2) {
        return c2 === " " || c2 === "\n" || c2 === "\r" || c2 === "	";
      }
      function isQuote(c2) {
        return c2 === '"' || c2 === "'";
      }
      function isAttribEnd(c2) {
        return c2 === ">" || isWhitespace(c2);
      }
      function isMatch(regex, c2) {
        return regex.test(c2);
      }
      function notMatch(regex, c2) {
        return !isMatch(regex, c2);
      }
      var S = 0;
      sax2.STATE = {
        BEGIN: S++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: S++,
        // leading whitespace
        TEXT: S++,
        // general stuff
        TEXT_ENTITY: S++,
        // &amp and such.
        OPEN_WAKA: S++,
        // <
        SGML_DECL: S++,
        // <!BLARG
        SGML_DECL_QUOTED: S++,
        // <!BLARG foo "bar
        DOCTYPE: S++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: S++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: S++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: S++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: S++,
        // <!-
        COMMENT: S++,
        // <!--
        COMMENT_ENDING: S++,
        // <!-- blah -
        COMMENT_ENDED: S++,
        // <!-- blah --
        CDATA: S++,
        // <![CDATA[ something
        CDATA_ENDING: S++,
        // ]
        CDATA_ENDING_2: S++,
        // ]]
        PROC_INST: S++,
        // <?hi
        PROC_INST_BODY: S++,
        // <?hi there
        PROC_INST_ENDING: S++,
        // <?hi "there" ?
        OPEN_TAG: S++,
        // <strong
        OPEN_TAG_SLASH: S++,
        // <strong /
        ATTRIB: S++,
        // <a
        ATTRIB_NAME: S++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: S++,
        // <a foo _
        ATTRIB_VALUE: S++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: S++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: S++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: S++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: S++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: S++,
        // <foo bar=&quot
        CLOSE_TAG: S++,
        // </a
        CLOSE_TAG_SAW_WHITE: S++,
        // </a   >
        SCRIPT: S++,
        // <script> ...
        SCRIPT_ENDING: S++
        // <script> ... <
      };
      sax2.XML_ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'"
      };
      sax2.ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'",
        "AElig": 198,
        "Aacute": 193,
        "Acirc": 194,
        "Agrave": 192,
        "Aring": 197,
        "Atilde": 195,
        "Auml": 196,
        "Ccedil": 199,
        "ETH": 208,
        "Eacute": 201,
        "Ecirc": 202,
        "Egrave": 200,
        "Euml": 203,
        "Iacute": 205,
        "Icirc": 206,
        "Igrave": 204,
        "Iuml": 207,
        "Ntilde": 209,
        "Oacute": 211,
        "Ocirc": 212,
        "Ograve": 210,
        "Oslash": 216,
        "Otilde": 213,
        "Ouml": 214,
        "THORN": 222,
        "Uacute": 218,
        "Ucirc": 219,
        "Ugrave": 217,
        "Uuml": 220,
        "Yacute": 221,
        "aacute": 225,
        "acirc": 226,
        "aelig": 230,
        "agrave": 224,
        "aring": 229,
        "atilde": 227,
        "auml": 228,
        "ccedil": 231,
        "eacute": 233,
        "ecirc": 234,
        "egrave": 232,
        "eth": 240,
        "euml": 235,
        "iacute": 237,
        "icirc": 238,
        "igrave": 236,
        "iuml": 239,
        "ntilde": 241,
        "oacute": 243,
        "ocirc": 244,
        "ograve": 242,
        "oslash": 248,
        "otilde": 245,
        "ouml": 246,
        "szlig": 223,
        "thorn": 254,
        "uacute": 250,
        "ucirc": 251,
        "ugrave": 249,
        "uuml": 252,
        "yacute": 253,
        "yuml": 255,
        "copy": 169,
        "reg": 174,
        "nbsp": 160,
        "iexcl": 161,
        "cent": 162,
        "pound": 163,
        "curren": 164,
        "yen": 165,
        "brvbar": 166,
        "sect": 167,
        "uml": 168,
        "ordf": 170,
        "laquo": 171,
        "not": 172,
        "shy": 173,
        "macr": 175,
        "deg": 176,
        "plusmn": 177,
        "sup1": 185,
        "sup2": 178,
        "sup3": 179,
        "acute": 180,
        "micro": 181,
        "para": 182,
        "middot": 183,
        "cedil": 184,
        "ordm": 186,
        "raquo": 187,
        "frac14": 188,
        "frac12": 189,
        "frac34": 190,
        "iquest": 191,
        "times": 215,
        "divide": 247,
        "OElig": 338,
        "oelig": 339,
        "Scaron": 352,
        "scaron": 353,
        "Yuml": 376,
        "fnof": 402,
        "circ": 710,
        "tilde": 732,
        "Alpha": 913,
        "Beta": 914,
        "Gamma": 915,
        "Delta": 916,
        "Epsilon": 917,
        "Zeta": 918,
        "Eta": 919,
        "Theta": 920,
        "Iota": 921,
        "Kappa": 922,
        "Lambda": 923,
        "Mu": 924,
        "Nu": 925,
        "Xi": 926,
        "Omicron": 927,
        "Pi": 928,
        "Rho": 929,
        "Sigma": 931,
        "Tau": 932,
        "Upsilon": 933,
        "Phi": 934,
        "Chi": 935,
        "Psi": 936,
        "Omega": 937,
        "alpha": 945,
        "beta": 946,
        "gamma": 947,
        "delta": 948,
        "epsilon": 949,
        "zeta": 950,
        "eta": 951,
        "theta": 952,
        "iota": 953,
        "kappa": 954,
        "lambda": 955,
        "mu": 956,
        "nu": 957,
        "xi": 958,
        "omicron": 959,
        "pi": 960,
        "rho": 961,
        "sigmaf": 962,
        "sigma": 963,
        "tau": 964,
        "upsilon": 965,
        "phi": 966,
        "chi": 967,
        "psi": 968,
        "omega": 969,
        "thetasym": 977,
        "upsih": 978,
        "piv": 982,
        "ensp": 8194,
        "emsp": 8195,
        "thinsp": 8201,
        "zwnj": 8204,
        "zwj": 8205,
        "lrm": 8206,
        "rlm": 8207,
        "ndash": 8211,
        "mdash": 8212,
        "lsquo": 8216,
        "rsquo": 8217,
        "sbquo": 8218,
        "ldquo": 8220,
        "rdquo": 8221,
        "bdquo": 8222,
        "dagger": 8224,
        "Dagger": 8225,
        "bull": 8226,
        "hellip": 8230,
        "permil": 8240,
        "prime": 8242,
        "Prime": 8243,
        "lsaquo": 8249,
        "rsaquo": 8250,
        "oline": 8254,
        "frasl": 8260,
        "euro": 8364,
        "image": 8465,
        "weierp": 8472,
        "real": 8476,
        "trade": 8482,
        "alefsym": 8501,
        "larr": 8592,
        "uarr": 8593,
        "rarr": 8594,
        "darr": 8595,
        "harr": 8596,
        "crarr": 8629,
        "lArr": 8656,
        "uArr": 8657,
        "rArr": 8658,
        "dArr": 8659,
        "hArr": 8660,
        "forall": 8704,
        "part": 8706,
        "exist": 8707,
        "empty": 8709,
        "nabla": 8711,
        "isin": 8712,
        "notin": 8713,
        "ni": 8715,
        "prod": 8719,
        "sum": 8721,
        "minus": 8722,
        "lowast": 8727,
        "radic": 8730,
        "prop": 8733,
        "infin": 8734,
        "ang": 8736,
        "and": 8743,
        "or": 8744,
        "cap": 8745,
        "cup": 8746,
        "int": 8747,
        "there4": 8756,
        "sim": 8764,
        "cong": 8773,
        "asymp": 8776,
        "ne": 8800,
        "equiv": 8801,
        "le": 8804,
        "ge": 8805,
        "sub": 8834,
        "sup": 8835,
        "nsub": 8836,
        "sube": 8838,
        "supe": 8839,
        "oplus": 8853,
        "otimes": 8855,
        "perp": 8869,
        "sdot": 8901,
        "lceil": 8968,
        "rceil": 8969,
        "lfloor": 8970,
        "rfloor": 8971,
        "lang": 9001,
        "rang": 9002,
        "loz": 9674,
        "spades": 9824,
        "clubs": 9827,
        "hearts": 9829,
        "diams": 9830
      };
      Object.keys(sax2.ENTITIES).forEach(function(key) {
        var e2 = sax2.ENTITIES[key];
        var s3 = typeof e2 === "number" ? String.fromCharCode(e2) : e2;
        sax2.ENTITIES[key] = s3;
      });
      for (var s2 in sax2.STATE) {
        sax2.STATE[sax2.STATE[s2]] = s2;
      }
      S = sax2.STATE;
      function emit2(parser, event, data) {
        parser[event] && parser[event](data);
      }
      function emitNode(parser, nodeType, data) {
        if (parser.textNode) closeText(parser);
        emit2(parser, nodeType, data);
      }
      function closeText(parser) {
        parser.textNode = textopts(parser.opt, parser.textNode);
        if (parser.textNode) emit2(parser, "ontext", parser.textNode);
        parser.textNode = "";
      }
      function textopts(opt, text) {
        if (opt.trim) text = text.trim();
        if (opt.normalize) text = text.replace(/\s+/g, " ");
        return text;
      }
      function error(parser, er) {
        closeText(parser);
        if (parser.trackPosition) {
          er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
        }
        er = new Error(er);
        parser.error = er;
        emit2(parser, "onerror", er);
        return parser;
      }
      function end(parser) {
        if (parser.sawRoot && !parser.closedRoot) strictFail(parser, "Unclosed root tag");
        if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
          error(parser, "Unexpected end");
        }
        closeText(parser);
        parser.c = "";
        parser.closed = true;
        emit2(parser, "onend");
        SAXParser.call(parser, parser.strict, parser.opt);
        return parser;
      }
      function strictFail(parser, message) {
        if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
          throw new Error("bad call to strictFail");
        }
        if (parser.strict) {
          error(parser, message);
        }
      }
      function newTag(parser) {
        if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
        var parent = parser.tags[parser.tags.length - 1] || parser;
        var tag = parser.tag = { name: parser.tagName, attributes: {} };
        if (parser.opt.xmlns) {
          tag.ns = parent.ns;
        }
        parser.attribList.length = 0;
        emitNode(parser, "onopentagstart", tag);
      }
      function qname(name, attribute) {
        var i2 = name.indexOf(":");
        var qualName = i2 < 0 ? ["", name] : name.split(":");
        var prefix = qualName[0];
        var local = qualName[1];
        if (attribute && name === "xmlns") {
          prefix = "xmlns";
          local = "";
        }
        return { prefix, local };
      }
      function attrib(parser) {
        if (!parser.strict) {
          parser.attribName = parser.attribName[parser.looseCase]();
        }
        if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
          parser.attribName = parser.attribValue = "";
          return;
        }
        if (parser.opt.xmlns) {
          var qn = qname(parser.attribName, true);
          var prefix = qn.prefix;
          var local = qn.local;
          if (prefix === "xmlns") {
            if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
              strictFail(
                parser,
                "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue
              );
            } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
              strictFail(
                parser,
                "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue
              );
            } else {
              var tag = parser.tag;
              var parent = parser.tags[parser.tags.length - 1] || parser;
              if (tag.ns === parent.ns) {
                tag.ns = Object.create(parent.ns);
              }
              tag.ns[local] = parser.attribValue;
            }
          }
          parser.attribList.push([parser.attribName, parser.attribValue]);
        } else {
          parser.tag.attributes[parser.attribName] = parser.attribValue;
          emitNode(parser, "onattribute", {
            name: parser.attribName,
            value: parser.attribValue
          });
        }
        parser.attribName = parser.attribValue = "";
      }
      function openTag(parser, selfClosing) {
        if (parser.opt.xmlns) {
          var tag = parser.tag;
          var qn = qname(parser.tagName);
          tag.prefix = qn.prefix;
          tag.local = qn.local;
          tag.uri = tag.ns[qn.prefix] || "";
          if (tag.prefix && !tag.uri) {
            strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
            tag.uri = qn.prefix;
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (tag.ns && parent.ns !== tag.ns) {
            Object.keys(tag.ns).forEach(function(p2) {
              emitNode(parser, "onopennamespace", {
                prefix: p2,
                uri: tag.ns[p2]
              });
            });
          }
          for (var i2 = 0, l2 = parser.attribList.length; i2 < l2; i2++) {
            var nv = parser.attribList[i2];
            var name = nv[0];
            var value = nv[1];
            var qualName = qname(name, true);
            var prefix = qualName.prefix;
            var local = qualName.local;
            var uri = prefix === "" ? "" : tag.ns[prefix] || "";
            var a2 = {
              name,
              value,
              prefix,
              local,
              uri
            };
            if (prefix && prefix !== "xmlns" && !uri) {
              strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
              a2.uri = prefix;
            }
            parser.tag.attributes[name] = a2;
            emitNode(parser, "onattribute", a2);
          }
          parser.attribList.length = 0;
        }
        parser.tag.isSelfClosing = !!selfClosing;
        parser.sawRoot = true;
        parser.tags.push(parser.tag);
        emitNode(parser, "onopentag", parser.tag);
        if (!selfClosing) {
          if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
            parser.state = S.SCRIPT;
          } else {
            parser.state = S.TEXT;
          }
          parser.tag = null;
          parser.tagName = "";
        }
        parser.attribName = parser.attribValue = "";
        parser.attribList.length = 0;
      }
      function closeTag(parser) {
        if (!parser.tagName) {
          strictFail(parser, "Weird empty close tag.");
          parser.textNode += "</>";
          parser.state = S.TEXT;
          return;
        }
        if (parser.script) {
          if (parser.tagName !== "script") {
            parser.script += "</" + parser.tagName + ">";
            parser.tagName = "";
            parser.state = S.SCRIPT;
            return;
          }
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
        var t2 = parser.tags.length;
        var tagName = parser.tagName;
        if (!parser.strict) {
          tagName = tagName[parser.looseCase]();
        }
        var closeTo = tagName;
        while (t2--) {
          var close = parser.tags[t2];
          if (close.name !== closeTo) {
            strictFail(parser, "Unexpected close tag");
          } else {
            break;
          }
        }
        if (t2 < 0) {
          strictFail(parser, "Unmatched closing tag: " + parser.tagName);
          parser.textNode += "</" + parser.tagName + ">";
          parser.state = S.TEXT;
          return;
        }
        parser.tagName = tagName;
        var s3 = parser.tags.length;
        while (s3-- > t2) {
          var tag = parser.tag = parser.tags.pop();
          parser.tagName = parser.tag.name;
          emitNode(parser, "onclosetag", parser.tagName);
          var x = {};
          for (var i2 in tag.ns) {
            x[i2] = tag.ns[i2];
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (parser.opt.xmlns && tag.ns !== parent.ns) {
            Object.keys(tag.ns).forEach(function(p2) {
              var n2 = tag.ns[p2];
              emitNode(parser, "onclosenamespace", { prefix: p2, uri: n2 });
            });
          }
        }
        if (t2 === 0) parser.closedRoot = true;
        parser.tagName = parser.attribValue = parser.attribName = "";
        parser.attribList.length = 0;
        parser.state = S.TEXT;
      }
      function parseEntity(parser) {
        var entity = parser.entity;
        var entityLC = entity.toLowerCase();
        var num;
        var numStr = "";
        if (parser.ENTITIES[entity]) {
          return parser.ENTITIES[entity];
        }
        if (parser.ENTITIES[entityLC]) {
          return parser.ENTITIES[entityLC];
        }
        entity = entityLC;
        if (entity.charAt(0) === "#") {
          if (entity.charAt(1) === "x") {
            entity = entity.slice(2);
            num = parseInt(entity, 16);
            numStr = num.toString(16);
          } else {
            entity = entity.slice(1);
            num = parseInt(entity, 10);
            numStr = num.toString(10);
          }
        }
        entity = entity.replace(/^0+/, "");
        if (isNaN(num) || numStr.toLowerCase() !== entity) {
          strictFail(parser, "Invalid character entity");
          return "&" + parser.entity + ";";
        }
        return String.fromCodePoint(num);
      }
      function beginWhiteSpace(parser, c2) {
        if (c2 === "<") {
          parser.state = S.OPEN_WAKA;
          parser.startTagPosition = parser.position;
        } else if (!isWhitespace(c2)) {
          strictFail(parser, "Non-whitespace before first tag.");
          parser.textNode = c2;
          parser.state = S.TEXT;
        }
      }
      function charAt(chunk, i2) {
        var result = "";
        if (i2 < chunk.length) {
          result = chunk.charAt(i2);
        }
        return result;
      }
      function write(chunk) {
        var parser = this;
        if (this.error) {
          throw this.error;
        }
        if (parser.closed) {
          return error(
            parser,
            "Cannot write after close. Assign an onready handler."
          );
        }
        if (chunk === null) {
          return end(parser);
        }
        if (typeof chunk === "object") {
          chunk = chunk.toString();
        }
        var i2 = 0;
        var c2 = "";
        while (true) {
          c2 = charAt(chunk, i2++);
          parser.c = c2;
          if (!c2) {
            break;
          }
          if (parser.trackPosition) {
            parser.position++;
            if (c2 === "\n") {
              parser.line++;
              parser.column = 0;
            } else {
              parser.column++;
            }
          }
          switch (parser.state) {
            case S.BEGIN:
              parser.state = S.BEGIN_WHITESPACE;
              if (c2 === "\uFEFF") {
                continue;
              }
              beginWhiteSpace(parser, c2);
              continue;
            case S.BEGIN_WHITESPACE:
              beginWhiteSpace(parser, c2);
              continue;
            case S.TEXT:
              if (parser.sawRoot && !parser.closedRoot) {
                var starti = i2 - 1;
                while (c2 && c2 !== "<" && c2 !== "&") {
                  c2 = charAt(chunk, i2++);
                  if (c2 && parser.trackPosition) {
                    parser.position++;
                    if (c2 === "\n") {
                      parser.line++;
                      parser.column = 0;
                    } else {
                      parser.column++;
                    }
                  }
                }
                parser.textNode += chunk.substring(starti, i2 - 1);
              }
              if (c2 === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                parser.state = S.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else {
                if (!isWhitespace(c2) && (!parser.sawRoot || parser.closedRoot)) {
                  strictFail(parser, "Text data outside of root node.");
                }
                if (c2 === "&") {
                  parser.state = S.TEXT_ENTITY;
                } else {
                  parser.textNode += c2;
                }
              }
              continue;
            case S.SCRIPT:
              if (c2 === "<") {
                parser.state = S.SCRIPT_ENDING;
              } else {
                parser.script += c2;
              }
              continue;
            case S.SCRIPT_ENDING:
              if (c2 === "/") {
                parser.state = S.CLOSE_TAG;
              } else {
                parser.script += "<" + c2;
                parser.state = S.SCRIPT;
              }
              continue;
            case S.OPEN_WAKA:
              if (c2 === "!") {
                parser.state = S.SGML_DECL;
                parser.sgmlDecl = "";
              } else if (isWhitespace(c2)) ;
              else if (isMatch(nameStart, c2)) {
                parser.state = S.OPEN_TAG;
                parser.tagName = c2;
              } else if (c2 === "/") {
                parser.state = S.CLOSE_TAG;
                parser.tagName = "";
              } else if (c2 === "?") {
                parser.state = S.PROC_INST;
                parser.procInstName = parser.procInstBody = "";
              } else {
                strictFail(parser, "Unencoded <");
                if (parser.startTagPosition + 1 < parser.position) {
                  var pad = parser.position - parser.startTagPosition;
                  c2 = new Array(pad).join(" ") + c2;
                }
                parser.textNode += "<" + c2;
                parser.state = S.TEXT;
              }
              continue;
            case S.SGML_DECL:
              if (parser.sgmlDecl + c2 === "--") {
                parser.state = S.COMMENT;
                parser.comment = "";
                parser.sgmlDecl = "";
                continue;
              }
              if (parser.doctype && parser.doctype !== true && parser.sgmlDecl) {
                parser.state = S.DOCTYPE_DTD;
                parser.doctype += "<!" + parser.sgmlDecl + c2;
                parser.sgmlDecl = "";
              } else if ((parser.sgmlDecl + c2).toUpperCase() === CDATA) {
                emitNode(parser, "onopencdata");
                parser.state = S.CDATA;
                parser.sgmlDecl = "";
                parser.cdata = "";
              } else if ((parser.sgmlDecl + c2).toUpperCase() === DOCTYPE) {
                parser.state = S.DOCTYPE;
                if (parser.doctype || parser.sawRoot) {
                  strictFail(
                    parser,
                    "Inappropriately located doctype declaration"
                  );
                }
                parser.doctype = "";
                parser.sgmlDecl = "";
              } else if (c2 === ">") {
                emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                parser.sgmlDecl = "";
                parser.state = S.TEXT;
              } else if (isQuote(c2)) {
                parser.state = S.SGML_DECL_QUOTED;
                parser.sgmlDecl += c2;
              } else {
                parser.sgmlDecl += c2;
              }
              continue;
            case S.SGML_DECL_QUOTED:
              if (c2 === parser.q) {
                parser.state = S.SGML_DECL;
                parser.q = "";
              }
              parser.sgmlDecl += c2;
              continue;
            case S.DOCTYPE:
              if (c2 === ">") {
                parser.state = S.TEXT;
                emitNode(parser, "ondoctype", parser.doctype);
                parser.doctype = true;
              } else {
                parser.doctype += c2;
                if (c2 === "[") {
                  parser.state = S.DOCTYPE_DTD;
                } else if (isQuote(c2)) {
                  parser.state = S.DOCTYPE_QUOTED;
                  parser.q = c2;
                }
              }
              continue;
            case S.DOCTYPE_QUOTED:
              parser.doctype += c2;
              if (c2 === parser.q) {
                parser.q = "";
                parser.state = S.DOCTYPE;
              }
              continue;
            case S.DOCTYPE_DTD:
              if (c2 === "]") {
                parser.doctype += c2;
                parser.state = S.DOCTYPE;
              } else if (c2 === "<") {
                parser.state = S.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else if (isQuote(c2)) {
                parser.doctype += c2;
                parser.state = S.DOCTYPE_DTD_QUOTED;
                parser.q = c2;
              } else {
                parser.doctype += c2;
              }
              continue;
            case S.DOCTYPE_DTD_QUOTED:
              parser.doctype += c2;
              if (c2 === parser.q) {
                parser.state = S.DOCTYPE_DTD;
                parser.q = "";
              }
              continue;
            case S.COMMENT:
              if (c2 === "-") {
                parser.state = S.COMMENT_ENDING;
              } else {
                parser.comment += c2;
              }
              continue;
            case S.COMMENT_ENDING:
              if (c2 === "-") {
                parser.state = S.COMMENT_ENDED;
                parser.comment = textopts(parser.opt, parser.comment);
                if (parser.comment) {
                  emitNode(parser, "oncomment", parser.comment);
                }
                parser.comment = "";
              } else {
                parser.comment += "-" + c2;
                parser.state = S.COMMENT;
              }
              continue;
            case S.COMMENT_ENDED:
              if (c2 !== ">") {
                strictFail(parser, "Malformed comment");
                parser.comment += "--" + c2;
                parser.state = S.COMMENT;
              } else if (parser.doctype && parser.doctype !== true) {
                parser.state = S.DOCTYPE_DTD;
              } else {
                parser.state = S.TEXT;
              }
              continue;
            case S.CDATA:
              if (c2 === "]") {
                parser.state = S.CDATA_ENDING;
              } else {
                parser.cdata += c2;
              }
              continue;
            case S.CDATA_ENDING:
              if (c2 === "]") {
                parser.state = S.CDATA_ENDING_2;
              } else {
                parser.cdata += "]" + c2;
                parser.state = S.CDATA;
              }
              continue;
            case S.CDATA_ENDING_2:
              if (c2 === ">") {
                if (parser.cdata) {
                  emitNode(parser, "oncdata", parser.cdata);
                }
                emitNode(parser, "onclosecdata");
                parser.cdata = "";
                parser.state = S.TEXT;
              } else if (c2 === "]") {
                parser.cdata += "]";
              } else {
                parser.cdata += "]]" + c2;
                parser.state = S.CDATA;
              }
              continue;
            case S.PROC_INST:
              if (c2 === "?") {
                parser.state = S.PROC_INST_ENDING;
              } else if (isWhitespace(c2)) {
                parser.state = S.PROC_INST_BODY;
              } else {
                parser.procInstName += c2;
              }
              continue;
            case S.PROC_INST_BODY:
              if (!parser.procInstBody && isWhitespace(c2)) {
                continue;
              } else if (c2 === "?") {
                parser.state = S.PROC_INST_ENDING;
              } else {
                parser.procInstBody += c2;
              }
              continue;
            case S.PROC_INST_ENDING:
              if (c2 === ">") {
                emitNode(parser, "onprocessinginstruction", {
                  name: parser.procInstName,
                  body: parser.procInstBody
                });
                parser.procInstName = parser.procInstBody = "";
                parser.state = S.TEXT;
              } else {
                parser.procInstBody += "?" + c2;
                parser.state = S.PROC_INST_BODY;
              }
              continue;
            case S.OPEN_TAG:
              if (isMatch(nameBody, c2)) {
                parser.tagName += c2;
              } else {
                newTag(parser);
                if (c2 === ">") {
                  openTag(parser);
                } else if (c2 === "/") {
                  parser.state = S.OPEN_TAG_SLASH;
                } else {
                  if (!isWhitespace(c2)) {
                    strictFail(parser, "Invalid character in tag name");
                  }
                  parser.state = S.ATTRIB;
                }
              }
              continue;
            case S.OPEN_TAG_SLASH:
              if (c2 === ">") {
                openTag(parser, true);
                closeTag(parser);
              } else {
                strictFail(parser, "Forward-slash in opening tag not followed by >");
                parser.state = S.ATTRIB;
              }
              continue;
            case S.ATTRIB:
              if (isWhitespace(c2)) {
                continue;
              } else if (c2 === ">") {
                openTag(parser);
              } else if (c2 === "/") {
                parser.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c2)) {
                parser.attribName = c2;
                parser.attribValue = "";
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME:
              if (c2 === "=") {
                parser.state = S.ATTRIB_VALUE;
              } else if (c2 === ">") {
                strictFail(parser, "Attribute without value");
                parser.attribValue = parser.attribName;
                attrib(parser);
                openTag(parser);
              } else if (isWhitespace(c2)) {
                parser.state = S.ATTRIB_NAME_SAW_WHITE;
              } else if (isMatch(nameBody, c2)) {
                parser.attribName += c2;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME_SAW_WHITE:
              if (c2 === "=") {
                parser.state = S.ATTRIB_VALUE;
              } else if (isWhitespace(c2)) {
                continue;
              } else {
                strictFail(parser, "Attribute without value");
                parser.tag.attributes[parser.attribName] = "";
                parser.attribValue = "";
                emitNode(parser, "onattribute", {
                  name: parser.attribName,
                  value: ""
                });
                parser.attribName = "";
                if (c2 === ">") {
                  openTag(parser);
                } else if (isMatch(nameStart, c2)) {
                  parser.attribName = c2;
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                  parser.state = S.ATTRIB;
                }
              }
              continue;
            case S.ATTRIB_VALUE:
              if (isWhitespace(c2)) {
                continue;
              } else if (isQuote(c2)) {
                parser.q = c2;
                parser.state = S.ATTRIB_VALUE_QUOTED;
              } else {
                if (!parser.opt.unquotedAttributeValues) {
                  error(parser, "Unquoted attribute value");
                }
                parser.state = S.ATTRIB_VALUE_UNQUOTED;
                parser.attribValue = c2;
              }
              continue;
            case S.ATTRIB_VALUE_QUOTED:
              if (c2 !== parser.q) {
                if (c2 === "&") {
                  parser.state = S.ATTRIB_VALUE_ENTITY_Q;
                } else {
                  parser.attribValue += c2;
                }
                continue;
              }
              attrib(parser);
              parser.q = "";
              parser.state = S.ATTRIB_VALUE_CLOSED;
              continue;
            case S.ATTRIB_VALUE_CLOSED:
              if (isWhitespace(c2)) {
                parser.state = S.ATTRIB;
              } else if (c2 === ">") {
                openTag(parser);
              } else if (c2 === "/") {
                parser.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c2)) {
                strictFail(parser, "No whitespace between attributes");
                parser.attribName = c2;
                parser.attribValue = "";
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_VALUE_UNQUOTED:
              if (!isAttribEnd(c2)) {
                if (c2 === "&") {
                  parser.state = S.ATTRIB_VALUE_ENTITY_U;
                } else {
                  parser.attribValue += c2;
                }
                continue;
              }
              attrib(parser);
              if (c2 === ">") {
                openTag(parser);
              } else {
                parser.state = S.ATTRIB;
              }
              continue;
            case S.CLOSE_TAG:
              if (!parser.tagName) {
                if (isWhitespace(c2)) {
                  continue;
                } else if (notMatch(nameStart, c2)) {
                  if (parser.script) {
                    parser.script += "</" + c2;
                    parser.state = S.SCRIPT;
                  } else {
                    strictFail(parser, "Invalid tagname in closing tag.");
                  }
                } else {
                  parser.tagName = c2;
                }
              } else if (c2 === ">") {
                closeTag(parser);
              } else if (isMatch(nameBody, c2)) {
                parser.tagName += c2;
              } else if (parser.script) {
                parser.script += "</" + parser.tagName;
                parser.tagName = "";
                parser.state = S.SCRIPT;
              } else {
                if (!isWhitespace(c2)) {
                  strictFail(parser, "Invalid tagname in closing tag");
                }
                parser.state = S.CLOSE_TAG_SAW_WHITE;
              }
              continue;
            case S.CLOSE_TAG_SAW_WHITE:
              if (isWhitespace(c2)) {
                continue;
              }
              if (c2 === ">") {
                closeTag(parser);
              } else {
                strictFail(parser, "Invalid characters in closing tag");
              }
              continue;
            case S.TEXT_ENTITY:
            case S.ATTRIB_VALUE_ENTITY_Q:
            case S.ATTRIB_VALUE_ENTITY_U:
              var returnState;
              var buffer;
              switch (parser.state) {
                case S.TEXT_ENTITY:
                  returnState = S.TEXT;
                  buffer = "textNode";
                  break;
                case S.ATTRIB_VALUE_ENTITY_Q:
                  returnState = S.ATTRIB_VALUE_QUOTED;
                  buffer = "attribValue";
                  break;
                case S.ATTRIB_VALUE_ENTITY_U:
                  returnState = S.ATTRIB_VALUE_UNQUOTED;
                  buffer = "attribValue";
                  break;
              }
              if (c2 === ";") {
                var parsedEntity = parseEntity(parser);
                if (parser.opt.unparsedEntities && !Object.values(sax2.XML_ENTITIES).includes(parsedEntity)) {
                  parser.entity = "";
                  parser.state = returnState;
                  parser.write(parsedEntity);
                } else {
                  parser[buffer] += parsedEntity;
                  parser.entity = "";
                  parser.state = returnState;
                }
              } else if (isMatch(parser.entity.length ? entityBody : entityStart, c2)) {
                parser.entity += c2;
              } else {
                strictFail(parser, "Invalid character in entity name");
                parser[buffer] += "&" + parser.entity + c2;
                parser.entity = "";
                parser.state = returnState;
              }
              continue;
            default: {
              throw new Error(parser, "Unknown state: " + parser.state);
            }
          }
        }
        if (parser.position >= parser.bufferCheckPosition) {
          checkBufferLength(parser);
        }
        return parser;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      if (!String.fromCodePoint) {
        (function() {
          var stringFromCharCode = String.fromCharCode;
          var floor = Math.floor;
          var fromCodePoint = function() {
            var MAX_SIZE = 16384;
            var codeUnits = [];
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;
            if (!length) {
              return "";
            }
            var result = "";
            while (++index < length) {
              var codePoint = Number(arguments[index]);
              if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 || // not a valid Unicode code point
              codePoint > 1114111 || // not a valid Unicode code point
              floor(codePoint) !== codePoint) {
                throw RangeError("Invalid code point: " + codePoint);
              }
              if (codePoint <= 65535) {
                codeUnits.push(codePoint);
              } else {
                codePoint -= 65536;
                highSurrogate = (codePoint >> 10) + 55296;
                lowSurrogate = codePoint % 1024 + 56320;
                codeUnits.push(highSurrogate, lowSurrogate);
              }
              if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
              }
            }
            return result;
          };
          if (Object.defineProperty) {
            Object.defineProperty(String, "fromCodePoint", {
              value: fromCodePoint,
              configurable: true,
              writable: true
            });
          } else {
            String.fromCodePoint = fromCodePoint;
          }
        })();
      }
    })(exports);
  })(sax$1);
  return sax$1;
}
var saxExports = requireSax();
const sax = /* @__PURE__ */ getDefaultExportFromCjs(saxExports);
const namespaceMapping = {
  "http://www.w3.org/2000/svg": {
    ext: "svg",
    mime: "image/svg+xml"
  },
  "http://www.w3.org/1999/xhtml": {
    ext: "xhtml",
    mime: "application/xhtml+xml"
  },
  "http://www.opengis.net/kml/2.2": {
    ext: "kml",
    mime: "application/vnd.google-earth.kml+xml"
  },
  "http://www.opengis.net/gml": {
    ext: "gml",
    mime: "application/gml+xml"
  }
};
const rootNameMapping = {
  rss: {
    ext: "rss",
    mime: "application/rss+xml"
  },
  "score-partwise": {
    ext: "musicxml",
    mime: "application/vnd.recordare.musicxml+xml"
  },
  svg: {
    ext: "svg",
    mime: "image/svg+xml"
  }
};
class XmlTextDetector {
  constructor(options) {
    this.options = options ?? {};
    this.firstTag = true;
    this.onEnd = false;
    this.parser = sax.parser(true, { xmlns: true });
    this.nesting = 0;
    this.parser.onerror = (e2) => {
      if (e2.message.startsWith("Invalid character entity")) {
        return;
      }
      this.fileType = void 0;
      this.onEnd = true;
    };
    this.parser.onopentag = (node) => {
      ++this.nesting;
      if (!this.firstTag || this.onEnd) {
        return;
      }
      this.firstTag = false;
      if (node.uri) {
        this.fileType = namespaceMapping[node.uri];
      } else if (node.name) {
        this.fileType = rootNameMapping[node.name.toLowerCase()];
      }
      if (this.fileType && !this.options.fullScan) {
        this.onEnd = true;
      }
    };
    this.parser.onclosetag = () => {
      --this.nesting;
    };
  }
  write(text) {
    this.parser.write(text);
  }
  close() {
    this.parser.close();
    this.onEnd = true;
  }
  isValid() {
    return this.nesting === 0;
  }
}
function isSvg(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  string = string.trim();
  if (string.length === 0) {
    return false;
  }
  const xmlTextDetector = new XmlTextDetector();
  xmlTextDetector.write(string);
  return xmlTextDetector.isValid() && xmlTextDetector.fileType?.ext === "svg";
}
class View {
  _view;
  constructor(view) {
    isValidView(view);
    this._view = view;
  }
  get id() {
    return this._view.id;
  }
  get name() {
    return this._view.name;
  }
  get caption() {
    return this._view.caption;
  }
  get emptyTitle() {
    return this._view.emptyTitle;
  }
  get emptyCaption() {
    return this._view.emptyCaption;
  }
  get getContents() {
    return this._view.getContents;
  }
  get hidden() {
    return this._view.hidden;
  }
  get icon() {
    return this._view.icon;
  }
  set icon(icon) {
    this._view.icon = icon;
  }
  get order() {
    return this._view.order;
  }
  set order(order) {
    this._view.order = order;
  }
  get params() {
    return this._view.params;
  }
  set params(params) {
    this._view.params = params;
  }
  get columns() {
    return this._view.columns;
  }
  get emptyView() {
    return this._view.emptyView;
  }
  get parent() {
    return this._view.parent;
  }
  get sticky() {
    return this._view.sticky;
  }
  get expanded() {
    return this._view.expanded;
  }
  set expanded(expanded) {
    this._view.expanded = expanded;
  }
  get defaultSortKey() {
    return this._view.defaultSortKey;
  }
  get loadChildViews() {
    return this._view.loadChildViews;
  }
}
const isValidView = function(view) {
  if (!view.id || typeof view.id !== "string") {
    throw new Error("View id is required and must be a string");
  }
  if (!view.name || typeof view.name !== "string") {
    throw new Error("View name is required and must be a string");
  }
  if ("caption" in view && typeof view.caption !== "string") {
    throw new Error("View caption must be a string");
  }
  if (!view.getContents || typeof view.getContents !== "function") {
    throw new Error("View getContents is required and must be a function");
  }
  if ("hidden" in view && typeof view.hidden !== "boolean") {
    throw new Error("View hidden must be a boolean");
  }
  if (!view.icon || typeof view.icon !== "string" || !isSvg(view.icon)) {
    throw new Error("View icon is required and must be a valid svg string");
  }
  if ("order" in view && typeof view.order !== "number") {
    throw new Error("View order must be a number");
  }
  if (view.columns) {
    view.columns.forEach((column) => {
      if (!(column instanceof Column)) {
        throw new Error("View columns must be an array of Column. Invalid column found");
      }
    });
  }
  if (view.emptyView && typeof view.emptyView !== "function") {
    throw new Error("View emptyView must be a function");
  }
  if (view.parent && typeof view.parent !== "string") {
    throw new Error("View parent must be a string");
  }
  if ("sticky" in view && typeof view.sticky !== "boolean") {
    throw new Error("View sticky must be a boolean");
  }
  if ("expanded" in view && typeof view.expanded !== "boolean") {
    throw new Error("View expanded must be a boolean");
  }
  if (view.defaultSortKey && typeof view.defaultSortKey !== "string") {
    throw new Error("View defaultSortKey must be a string");
  }
  if (view.loadChildViews && typeof view.loadChildViews !== "function") {
    throw new Error("View loadChildViews must be a function");
  }
  return true;
};
var debug_1;
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug_1;
  hasRequiredDebug = 1;
  const debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  debug_1 = debug;
  return debug_1;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const SEMVER_SPEC_VERSION = "2.0.0";
  const MAX_LENGTH = 256;
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991;
  const MAX_SAFE_COMPONENT_LENGTH = 16;
  const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
  const RELEASE_TYPES = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease"
  ];
  constants = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  };
  return constants;
}
var re = { exports: {} };
var hasRequiredRe;
function requireRe() {
  if (hasRequiredRe) return re.exports;
  hasRequiredRe = 1;
  (function(module, exports) {
    const {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = requireConstants();
    const debug = requireDebug();
    exports = module.exports = {};
    const re2 = exports.re = [];
    const safeRe = exports.safeRe = [];
    const src = exports.src = [];
    const t2 = exports.t = {};
    let R = 0;
    const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    const safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    const makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    const createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t2[name] = index;
      src[index] = value;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
    createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
    createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t2.COERCE], true);
    createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re, re.exports);
  return re.exports;
}
var parseOptions_1;
var hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  const looseOption = Object.freeze({ loose: true });
  const emptyOpts = Object.freeze({});
  const parseOptions = (options) => {
    if (!options) {
      return emptyOpts;
    }
    if (typeof options !== "object") {
      return looseOption;
    }
    return options;
  };
  parseOptions_1 = parseOptions;
  return parseOptions_1;
}
var identifiers;
var hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const numeric = /^[0-9]+$/;
  const compareIdentifiers = (a2, b2) => {
    const anum = numeric.test(a2);
    const bnum = numeric.test(b2);
    if (anum && bnum) {
      a2 = +a2;
      b2 = +b2;
    }
    return a2 === b2 ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b2 ? -1 : 1;
  };
  const rcompareIdentifiers = (a2, b2) => compareIdentifiers(b2, a2);
  identifiers = {
    compareIdentifiers,
    rcompareIdentifiers
  };
  return identifiers;
}
var semver;
var hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver;
  hasRequiredSemver = 1;
  const debug = requireDebug();
  const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
  const { safeRe: re2, t: t2 } = requireRe();
  const parseOptions = requireParseOptions();
  const { compareIdentifiers } = requireIdentifiers();
  class SemVer {
    constructor(version, options) {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(
          `version is longer than ${MAX_LENGTH} characters`
        );
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      const m2 = version.trim().match(options.loose ? re2[t2.LOOSE] : re2[t2.FULL]);
      if (!m2) {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      this.raw = version;
      this.major = +m2[1];
      this.minor = +m2[2];
      this.patch = +m2[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m2[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m2[4].split(".").map((id) => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m2[5] ? m2[5].split(".") : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join(".")}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        if (typeof other === "string" && other === this.version) {
          return 0;
        }
        other = new SemVer(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i2 = 0;
      do {
        const a2 = this.prerelease[i2];
        const b2 = other.prerelease[i2];
        debug("prerelease compare", i2, a2, b2);
        if (a2 === void 0 && b2 === void 0) {
          return 0;
        } else if (b2 === void 0) {
          return 1;
        } else if (a2 === void 0) {
          return -1;
        } else if (a2 === b2) {
          continue;
        } else {
          return compareIdentifiers(a2, b2);
        }
      } while (++i2);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      let i2 = 0;
      do {
        const a2 = this.build[i2];
        const b2 = other.build[i2];
        debug("build compare", i2, a2, b2);
        if (a2 === void 0 && b2 === void 0) {
          return 0;
        } else if (b2 === void 0) {
          return 1;
        } else if (a2 === void 0) {
          return -1;
        } else if (a2 === b2) {
          continue;
        } else {
          return compareIdentifiers(a2, b2);
        }
      } while (++i2);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier, identifierBase);
          this.inc("pre", identifier, identifierBase);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier, identifierBase);
          }
          this.inc("pre", identifier, identifierBase);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const base = Number(identifierBase) ? 1 : 0;
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (this.prerelease.length === 0) {
            this.prerelease = [base];
          } else {
            let i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              if (identifier === this.prerelease.join(".") && identifierBase === false) {
                throw new Error("invalid increment argument: identifier already exists");
              }
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            let prerelease = [identifier, base];
            if (identifierBase === false) {
              prerelease = [identifier];
            }
            if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = prerelease;
              }
            } else {
              this.prerelease = prerelease;
            }
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.raw = this.format();
      if (this.build.length) {
        this.raw += `+${this.build.join(".")}`;
      }
      return this;
    }
  }
  semver = SemVer;
  return semver;
}
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const SemVer = requireSemver();
  const parse = (version, options, throwErrors = false) => {
    if (version instanceof SemVer) {
      return version;
    }
    try {
      return new SemVer(version, options);
    } catch (er) {
      if (!throwErrors) {
        return null;
      }
      throw er;
    }
  };
  parse_1 = parse;
  return parse_1;
}
var valid_1;
var hasRequiredValid;
function requireValid() {
  if (hasRequiredValid) return valid_1;
  hasRequiredValid = 1;
  const parse = requireParse();
  const valid2 = (version, options) => {
    const v = parse(version, options);
    return v ? v.version : null;
  };
  valid_1 = valid2;
  return valid_1;
}
var validExports = requireValid();
const valid = /* @__PURE__ */ getDefaultExportFromCjs(validExports);
var major_1;
var hasRequiredMajor;
function requireMajor() {
  if (hasRequiredMajor) return major_1;
  hasRequiredMajor = 1;
  const SemVer = requireSemver();
  const major2 = (a2, loose) => new SemVer(a2, loose).major;
  major_1 = major2;
  return major_1;
}
var majorExports = requireMajor();
const major = /* @__PURE__ */ getDefaultExportFromCjs(majorExports);
class ProxyBus {
  bus;
  constructor(bus2) {
    if (typeof bus2.getVersion !== "function" || !valid(bus2.getVersion())) {
      console.warn("Proxying an event bus with an unknown or invalid version");
    } else if (major(bus2.getVersion()) !== major(this.getVersion())) {
      console.warn(
        "Proxying an event bus of version " + bus2.getVersion() + " with " + this.getVersion()
      );
    }
    this.bus = bus2;
  }
  getVersion() {
    return "3.3.2";
  }
  subscribe(name, handler) {
    this.bus.subscribe(name, handler);
  }
  unsubscribe(name, handler) {
    this.bus.unsubscribe(name, handler);
  }
  emit(name, ...event) {
    this.bus.emit(name, ...event);
  }
}
class SimpleBus {
  handlers = /* @__PURE__ */ new Map();
  getVersion() {
    return "3.3.2";
  }
  subscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).concat(
        handler
      )
    );
  }
  unsubscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).filter((h2) => h2 !== handler)
    );
  }
  emit(name, ...event) {
    const handlers = this.handlers.get(name) || [];
    handlers.forEach((h2) => {
      try {
        ;
        h2(event[0]);
      } catch (e2) {
        console.error("could not invoke event listener", e2);
      }
    });
  }
}
let bus = null;
function getBus() {
  if (bus !== null) {
    return bus;
  }
  if (typeof window === "undefined") {
    return new Proxy({}, {
      get: () => {
        return () => console.error(
          "Window not available, EventBus can not be established!"
        );
      }
    });
  }
  if (window.OC?._eventBus && typeof window._nc_event_bus === "undefined") {
    console.warn(
      "found old event bus instance at OC._eventBus. Update your version!"
    );
    window._nc_event_bus = window.OC._eventBus;
  }
  if (typeof window?._nc_event_bus !== "undefined") {
    bus = new ProxyBus(window._nc_event_bus);
  } else {
    bus = window._nc_event_bus = new SimpleBus();
  }
  return bus;
}
function emit(name, ...event) {
  getBus().emit(name, ...event);
}
/*!
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
class FileListFilter extends TypedEventTarget {
  id;
  order;
  constructor(id, order = 100) {
    super();
    this.id = id;
    this.order = order;
  }
  filter(nodes) {
    throw new Error("Not implemented");
  }
  updateChips(chips) {
    this.dispatchTypedEvent("update:chips", new CustomEvent("update:chips", { detail: chips }));
  }
  filterUpdated() {
    this.dispatchTypedEvent("update:filter", new CustomEvent("update:filter"));
  }
}
function registerFileListFilter(filter) {
  if (!window._nc_filelist_filters) {
    window._nc_filelist_filters = /* @__PURE__ */ new Map();
  }
  if (window._nc_filelist_filters.has(filter.id)) {
    throw new Error(`File list filter "${filter.id}" already registered`);
  }
  window._nc_filelist_filters.set(filter.id, filter);
  emit("files:filter:added", filter);
}
function unregisterFileListFilter(filterId) {
  if (window._nc_filelist_filters && window._nc_filelist_filters.has(filterId)) {
    window._nc_filelist_filters.delete(filterId);
    emit("files:filter:removed", filterId);
  }
}
function getFileListFilters() {
  if (!window._nc_filelist_filters) {
    return [];
  }
  return [...window._nc_filelist_filters.values()];
}
const addNewFileMenuEntry = function(entry) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.registerEntry(entry);
};
const removeNewFileMenuEntry = function(entry) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.unregisterEntry(entry);
};
const getNewFileMenuEntries = function(context) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.getEntries(context).sort((a2, b2) => {
    if (a2.order !== void 0 && b2.order !== void 0 && a2.order !== b2.order) {
      return a2.order - b2.order;
    }
    return a2.displayName.localeCompare(b2.displayName, void 0, { numeric: true, sensitivity: "base" });
  });
};
export {
  Column,
  DefaultType,
  q as File,
  FileAction,
  FileListAction,
  FileListFilter,
  F as FileType,
  FilesSortingMode,
  s as Folder,
  Header,
  InvalidFilenameError,
  InvalidFilenameErrorReason,
  Navigation,
  NewMenuEntryCategory,
  N as Node,
  t as NodeStatus,
  P as Permission,
  View,
  addNewFileMenuEntry,
  c as davGetClient,
  l as davGetDefaultPropfind,
  m as davGetFavoritesReport,
  n as davGetRecentSearch,
  a as davGetRemoteURL,
  g as davGetRootPath,
  p as davParsePermissions,
  b as davRemoteURL,
  r as davResultToNode,
  d as davRootPath,
  h as defaultDavNamespaces,
  f as defaultDavProperties,
  formatFileSize,
  k as getDavNameSpaces,
  j as getDavProperties,
  e as getFavoriteNodes,
  getFileActions,
  getFileListActions,
  getFileListFilters,
  getFileListHeaders,
  getNavigation,
  getNewFileMenuEntries,
  getUniqueName,
  isFilenameValid,
  orderBy,
  parseFileSize,
  i as registerDavProperty,
  registerFileAction,
  registerFileListAction,
  registerFileListFilter,
  registerFileListHeaders,
  removeNewFileMenuEntry,
  sortNodes,
  unregisterFileListFilter,
  validateFilename
};
//# sourceMappingURL=index.mjs.map
