import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

type GithubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
  avatar_url: string;
};

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

const user = site.githubUser;

async function loadGithub() {
  const [profileRes, repoRes] = await Promise.all([
    fetch(`https://api.github.com/users/${user}`),
    fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=8`),
  ]);
  if (!profileRes.ok) throw new Error("GitHub profile unavailable");
  const profile = (await profileRes.json()) as GithubUser;
  const repos = repoRes.ok ? ((await repoRes.json()) as GithubRepo[]) : [];
  return {
    profile,
    repos: repos.filter((r) => !r.fork).slice(0, 6),
  };
}

export function GithubStrip() {
  const query = useQuery({
    queryKey: ["github", user],
    queryFn: loadGithub,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  if (query.isError) {
    return (
      <a
        href={site.contact.github}
        target="_blank"
        rel="noreferrer"
        className="glass inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm text-foreground"
      >
        GitHub · {site.contact.githubLabel}
        <ArrowUpRight className="size-4" />
      </a>
    );
  }

  if (query.isLoading || !query.data) {
    return (
      <div className="glass h-28 animate-pulse rounded-[24px]" aria-hidden />
    );
  }

  const { profile, repos } = query.data;

  return (
    <div>
      <Reveal className="glass flex flex-wrap items-center gap-5 rounded-[24px] p-5 sm:p-6">
        <img
          src={profile.avatar_url}
          alt=""
          width={56}
          height={56}
          className="size-14 rounded-full border border-hairline"
        />
        <div className="min-w-0 flex-1">
          <p className="label-xs text-muted-foreground">GitHub</p>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-2 text-foreground hover:underline"
          >
            {profile.name ?? profile.login}
            <ArrowUpRight className="size-3.5" />
          </a>
          {profile.bio ? (
            <p className="mt-1 text-sm text-muted-foreground">{profile.bio}</p>
          ) : null}
        </div>
        <dl className="flex gap-6 text-sm">
          <div>
            <dt className="label-xs text-muted-foreground">Repos</dt>
            <dd className="mt-1 text-foreground">{profile.public_repos}</dd>
          </div>
          <div>
            <dt className="label-xs text-muted-foreground">Followers</dt>
            <dd className="mt-1 text-foreground">{profile.followers}</dd>
          </div>
        </dl>
      </Reveal>

      {repos.length ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {repos.map((repo, i) => (
            <Reveal as="li" key={repo.id} delay={i * 0.04}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="glass group flex h-full flex-col rounded-[20px] p-4 transition-transform duration-500 hover:scale-[1.015]"
              >
                <span className="flex items-center justify-between gap-2 text-sm text-foreground">
                  {repo.name}
                  <ArrowUpRight className="size-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {repo.description ?? "Public repository"}
                </span>
                <span className="mt-3 label-xs text-muted-foreground">
                  {repo.language ?? "Code"} · {repo.stargazers_count} stars
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
