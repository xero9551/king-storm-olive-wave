import { useNavigate } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  generateFromNpmLock,
  generateFromRequirementsTxt,
  parseCycloneDx,
} from "@/lib/sboim/generate";
import { useSboimStore } from "@/lib/store";

export function IngestDialog({ label = "Ingest SBOM" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const ingest = useSboimStore((s) => s.ingestSbom);
  const navigate = useNavigate();

  async function finish(id: string) {
    setOpen(false);
    toast.success("SBOM ingested");
    await navigate({ to: "/inventory/$id", params: { id } });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="size-4" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Ingest an SBOM</DialogTitle>
          <DialogDescription>
            Upload CycloneDX JSON, or generate from a lockfile the same way{" "}
            <span className="font-mono">cra-sbom</span> does.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="cyclonedx">
          <TabsList className="w-full">
            <TabsTrigger value="cyclonedx" className="flex-1">
              CycloneDX
            </TabsTrigger>
            <TabsTrigger value="npm" className="flex-1">
              npm lock
            </TabsTrigger>
            <TabsTrigger value="python" className="flex-1">
              pip pins
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cyclonedx">
            <PasteForm
              placeholder='{ "bomFormat": "CycloneDX", ... }'
              accept=".json"
              onSubmit={async (text) => {
                const { sbom, warnings } = parseCycloneDx(text);
                const id = await ingest({
                  sbom,
                  source: "upload",
                  ecosystem: "cyclonedx",
                  warnings,
                  raw: text,
                });
                await finish(id);
              }}
            />
          </TabsContent>
          <TabsContent value="npm">
            <NpmForm
              onSubmit={async (lock, pkg) => {
                const { sbom, warnings } = generateFromNpmLock(lock, pkg);
                const id = await ingest({ sbom, source: "generated", ecosystem: "npm", warnings });
                await finish(id);
              }}
            />
          </TabsContent>
          <TabsContent value="python">
            <PythonForm
              onSubmit={async (text, name) => {
                const { sbom, warnings } = generateFromRequirementsTxt(text, name || "python-project");
                const id = await ingest({ sbom, source: "generated", ecosystem: "python", warnings });
                await finish(id);
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function PasteForm({
  placeholder,
  accept,
  onSubmit,
}: {
  placeholder: string;
  accept: string;
  onSubmit: (text: string) => Promise<void>;
}) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          await onSubmit(text);
        } catch (err) {
          toast.error((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <Label htmlFor="paste">Document</Label>
      <Textarea
        id="paste"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        required
      />
      <FileFill accept={accept} onText={setText} />
      <Button type="submit" disabled={busy || !text.trim()}>
        {busy ? "Ingesting…" : "Ingest"}
      </Button>
    </form>
  );
}

function NpmForm({ onSubmit }: { onSubmit: (lock: string, pkg?: string) => Promise<void> }) {
  const [lock, setLock] = useState("");
  const [pkg, setPkg] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          await onSubmit(lock, pkg || undefined);
        } catch (err) {
          toast.error((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <Label htmlFor="lock">package-lock.json</Label>
      <Textarea
        id="lock"
        value={lock}
        onChange={(e) => setLock(e.target.value)}
        placeholder="npm lockfile v1–v3"
        required
      />
      <FileFill accept=".json" onText={setLock} />
      <Label htmlFor="pkg">package.json (optional)</Label>
      <Textarea
        id="pkg"
        className="min-h-24"
        value={pkg}
        onChange={(e) => setPkg(e.target.value)}
        placeholder='{ "name": "my-app", "version": "1.0.0" }'
      />
      <Button type="submit" disabled={busy || !lock.trim()}>
        {busy ? "Generating…" : "Generate SBOM"}
      </Button>
    </form>
  );
}

function PythonForm({ onSubmit }: { onSubmit: (text: string, name: string) => Promise<void> }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("python-service");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          await onSubmit(text, name);
        } catch (err) {
          toast.error((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <Label htmlFor="subj">Project name</Label>
      <Input id="subj" value={name} onChange={(e) => setName(e.target.value)} />
      <Label htmlFor="req">requirements.txt (exact pins only)</Label>
      <Textarea
        id="req"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"django==5.1.1\nrequests==2.32.3"}
        required
      />
      <FileFill accept=".txt" onText={setText} />
      <Button type="submit" disabled={busy || !text.trim()}>
        {busy ? "Generating…" : "Generate SBOM"}
      </Button>
    </form>
  );
}

function FileFill({ accept, onText }: { accept: string; onText: (t: string) => void }) {
  return (
    <Input
      type="file"
      accept={accept}
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onText(await file.text());
      }}
    />
  );
}
