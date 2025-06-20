import { useDoubtSolver } from "@/hooks/useDoubtSolver";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function DoubtsPage() {
  const { doubts, askDoubt, isLoading } = useDoubtSolver();
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const result = await askDoubt(question, subject, topic);
    setAnswer(result.aiAnswer);
    setQuestion(""); setTopic(""); setSubject("");
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Ask a Doubt</h1>

      <Input placeholder="Subject (e.g. Physics)" value={subject} onChange={e => setSubject(e.target.value)} />
      <Input placeholder="Topic (e.g. Laws of Motion)" value={topic} onChange={e => setTopic(e.target.value)} />
      <Textarea placeholder="Type your doubt here..." value={question} onChange={e => setQuestion(e.target.value)} />

      <Button onClick={handleSubmit} disabled={loading || !question || !subject || !topic}>
        {loading ? "Thinking..." : "Get Answer"}
      </Button>

      {answer && (
        <div className="bg-green-100 border p-4 rounded-md">
          <h2 className="font-semibold mb-2">AI Answer:</h2>
          <p>{answer}</p>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Your Previous Doubts</h2>
        {isLoading ? <p>Loading...</p> : doubts.map((d: any) => (
          <div key={d._id} className="border rounded p-3 mb-4 bg-white shadow-sm">
            <p className="text-sm text-muted-foreground">[{d.subject} - {d.topic}]</p>
            <p className="font-medium">Q: {d.question}</p>
            <p className="mt-1 text-green-700">A: {d.aiAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
