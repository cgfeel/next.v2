import ButtonToPost from "../../components/ButtonToPost";
import RebackLink from "../../components/RebackLink";

export default function Default() {
    return (
      <>
        <h2>dashboard web default</h2>
        <p>
          <RebackLink />
        </p>
        <p>
          <ButtonToPost 
            pid={6} 
            prefetch={false} 
          />
        </p>
      </>
    )
}