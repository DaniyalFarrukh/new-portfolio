import Chapter2Intro from "@/components/chapters/Chapter2Intro";
import Chapter3Problem from "@/components/chapters/Chapter3Problem";
import Chapter4Approach from "@/components/chapters/Chapter4Approach";
import Chapter5Skills from "@/components/chapters/Chapter5Skills";
import Chapter7LetBuild from "@/components/chapters/Chapter7LetBuild";
import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="w-full min-h-screen selection:bg-primary/30 selection:text-white relative block">
      <Background />
      <Chapter2Intro />
      <Chapter3Problem />
      <Chapter4Approach />
      <Chapter5Skills />
      <Chapter7LetBuild />
    </main>
  );
}
