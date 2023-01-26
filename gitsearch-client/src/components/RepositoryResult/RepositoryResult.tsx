import classes from "./RepositoryResult.module.css";

export interface RepositoryResultProps {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  pushed_at: string;
  owner: { avatar_url: string, login: string, html_url : string };
}

export function RepositoryResult({ full_name, description, html_url, pushed_at, owner }: RepositoryResultProps) {
  const formattedDate = new Date(pushed_at).toDateString();

  return (
    <section className={classes["result-card"]}>
      <a href={owner.html_url} className={classes.icon}>
        <img src={owner.avatar_url}  alt={owner.login}/>
      </a>
      <div>
        <a href={html_url} className={classes.title}>
          {full_name}
        </a>
        <p>{description}</p>
        <p>Last Updated: {formattedDate}</p>
      </div>
    </section>
  );
}
