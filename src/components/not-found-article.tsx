import { Link } from "@tanstack/react-router";

export function NotFoundArticle() {
  return (
    <div className="article">
      <p>
        This is awkward... it seems like that article does not exist. If you want, you can go{" "}
        <Link to="/">Home</Link>, or you may ponder the philosophical meaning of getting lost with
        me.
      </p>

      <p>
        First and foremost, you arrived here with intention. There was, at some point, a clear
        idea—a destination, a neatly imagined endpoint where curiosity would be satisfied and
        meaning neatly packaged. Perhaps it had a title. Perhaps even a URL. It certainly had
        promise.
      </p>

      <p>
        And yet, here you are. This page, as you may have gathered (or perhaps are still bravely
        denying), is not the thing you were looking for. It is the absence of that thing, dressed up
        in typography and polite formatting. A digital shrug. A quiet acknowledgment that somewhere,
        between desire and arrival, something slipped.
      </p>
      <p>
        But let us not rush to disappointment. There is something quietly remarkable about being
        lost—especially in a place designed so meticulously to prevent it. The internet, after all,
        prides itself on precision. Links connect. Searches resolve. Algorithms anticipate. And
        still, occasionally, we fall through the cracks. Not all absences are failures. Some are
        invitations. Consider this: had you found exactly what you were looking for, you would not
        be reading this. You would have consumed your answer efficiently, perhaps even forgotten it
        by tomorrow. Instead, you’ve been paused. Redirected. Gently inconvenienced.
      </p>
      <p>
        There is a peculiar honesty in a “not found” page. It does not pretend. It does not
        optimize. It simply states: what you expected is not here. And yet, here you are.
      </p>
      <p>
        So what is it, exactly, that we seek when we seek? Is it the object itself, or the assurance
        that such objects can be found? And what happens, philosophically speaking, when that
        assurance falters—even briefly? You might argue that this page is useless. That it has
        failed its purpose. That it stands as a minor but irritating error in an otherwise
        functional system. But usefulness, like direction, depends on expectation. Perhaps this page
        is not a failure, but a detour. A moment in which the straight line bends just enough to
        remind you that it was never entirely straight to begin with.
      </p>
      <p>
        Or perhaps, more simply, the link was broken. Either way, you now have a choice: You can go{" "}
        <Link to="/">home</Link>, retrace your steps, and resume the pursuit of what you originally
        intended to find. Or you can linger here a moment longer, in this small, unintended corner
        of the site, and appreciate the rare experience of not arriving. After all, how often does a
        place announce, with such clarity, that it is not the place?
      </p>
      <p>
        If nothing else, take comfort in this: <em>You are not lost. You are simply not found</em>.
      </p>
    </div>
  );
}
