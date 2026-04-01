import { ArrowUpRight } from "lucide-react";

import { blogPosts } from "@/lib/data/mock-data";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <div>
      <SiteHeader />
      <main className="container-shell py-20">
        <div className="max-w-3xl">
          <p className="section-eyebrow">Blog</p>
          <h1 className="mt-6 text-5xl font-bold sm:text-6xl">Playbooks for calmer, sharper execution</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            A starter editorial hub for MDX-backed content, thought leadership, and tactical planning systems.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.title}>
              <CardContent className="space-y-5 p-7">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="leading-7 text-slate-600">{post.excerpt}</p>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700" type="button">
                  Read article
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
