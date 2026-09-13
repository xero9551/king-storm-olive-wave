import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Upload, t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogPortal$1, i as DialogOverlay$1, n as DialogClose, o as DialogTrigger$1, r as DialogContent$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { o as cn } from "./router-BwySQpKL.mjs";
import { g as useSboimStore, o as generateFromNpmLock, r as Button, s as generateFromRequirementsTxt, u as parseCycloneDx } from "./app-shell-Djr2oat5.mjs";
import { n as Label, t as Input } from "./label-CCE6uFil.mjs";
import { t as Textarea } from "./textarea-Dd4-MC44.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ingest-dialog-BcX3erCo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-card p-6 shadow-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm text-muted-foreground hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("text-lg font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-10 items-center gap-1 rounded-lg bg-secondary p-1", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-4 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function IngestDialog({ label = "Ingest SBOM" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const ingest = useSboimStore((s) => s.ingestSbom);
	const navigate = useNavigate();
	async function finish(id) {
		setOpen(false);
		toast.success("SBOM ingested");
		await navigate({
			to: "/inventory/$id",
			params: { id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), label] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90svh] overflow-y-auto sm:max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ingest an SBOM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				"Upload CycloneDX JSON, or generate from a lockfile the same way",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono",
					children: "cra-sbom"
				}),
				" does."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "cyclonedx",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "cyclonedx",
								className: "flex-1",
								children: "CycloneDX"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "npm",
								className: "flex-1",
								children: "npm lock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "python",
								className: "flex-1",
								children: "pip pins"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "cyclonedx",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasteForm, {
							placeholder: "{ \"bomFormat\": \"CycloneDX\", ... }",
							accept: ".json",
							onSubmit: async (text) => {
								const { sbom, warnings } = parseCycloneDx(text);
								await finish(await ingest({
									sbom,
									source: "upload",
									ecosystem: "cyclonedx",
									warnings,
									raw: text
								}));
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "npm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NpmForm, { onSubmit: async (lock, pkg) => {
							const { sbom, warnings } = generateFromNpmLock(lock, pkg);
							await finish(await ingest({
								sbom,
								source: "generated",
								ecosystem: "npm",
								warnings
							}));
						} })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "python",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PythonForm, { onSubmit: async (text, name) => {
							const { sbom, warnings } = generateFromRequirementsTxt(text, name || "python-project");
							await finish(await ingest({
								sbom,
								source: "generated",
								ecosystem: "python",
								warnings
							}));
						} })
					})
				]
			})]
		})]
	});
}
function PasteForm({ placeholder, accept, onSubmit }) {
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-3",
		onSubmit: async (e) => {
			e.preventDefault();
			setBusy(true);
			try {
				await onSubmit(text);
			} catch (err) {
				toast.error(err.message);
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "paste",
				children: "Document"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: "paste",
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder,
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileFill, {
				accept,
				onText: setText
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy || !text.trim(),
				children: busy ? "Ingesting…" : "Ingest"
			})
		]
	});
}
function NpmForm({ onSubmit }) {
	const [lock, setLock] = (0, import_react.useState)("");
	const [pkg, setPkg] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-3",
		onSubmit: async (e) => {
			e.preventDefault();
			setBusy(true);
			try {
				await onSubmit(lock, pkg || void 0);
			} catch (err) {
				toast.error(err.message);
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "lock",
				children: "package-lock.json"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: "lock",
				value: lock,
				onChange: (e) => setLock(e.target.value),
				placeholder: "npm lockfile v1–v3",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileFill, {
				accept: ".json",
				onText: setLock
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "pkg",
				children: "package.json (optional)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: "pkg",
				className: "min-h-24",
				value: pkg,
				onChange: (e) => setPkg(e.target.value),
				placeholder: "{ \"name\": \"my-app\", \"version\": \"1.0.0\" }"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy || !lock.trim(),
				children: busy ? "Generating…" : "Generate SBOM"
			})
		]
	});
}
function PythonForm({ onSubmit }) {
	const [text, setText] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("python-service");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-3",
		onSubmit: async (e) => {
			e.preventDefault();
			setBusy(true);
			try {
				await onSubmit(text, name);
			} catch (err) {
				toast.error(err.message);
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "subj",
				children: "Project name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "subj",
				value: name,
				onChange: (e) => setName(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "req",
				children: "requirements.txt (exact pins only)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: "req",
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: "django==5.1.1\nrequests==2.32.3",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileFill, {
				accept: ".txt",
				onText: setText
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy || !text.trim(),
				children: busy ? "Generating…" : "Generate SBOM"
			})
		]
	});
}
function FileFill({ accept, onText }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		type: "file",
		accept,
		onChange: async (e) => {
			const file = e.target.files?.[0];
			if (!file) return;
			onText(await file.text());
		}
	});
}
//#endregion
export { IngestDialog as t };
