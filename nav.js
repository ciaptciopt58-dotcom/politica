;(function () {
  const header = document.querySelector(".site-header")
  const toggle = document.getElementById("navToggle")
  const nav = document.getElementById("topNav")
  if (!header || !toggle || !nav) return

  const mobileMq = window.matchMedia("(max-width: 860px)")

  const applyState = (open) => {
    header.dataset.navOpen = open ? "true" : "false"
    toggle.setAttribute("aria-expanded", String(open))
    if (mobileMq.matches) {
      nav.hidden = !open
    } else {
      nav.hidden = false
    }
  }

  applyState(!mobileMq.matches)

  toggle.addEventListener("click", () => {
    const isOpen = header.dataset.navOpen === "true"
    applyState(!isOpen)
  })

  nav.addEventListener("click", (e) => {
    const link = e.target && e.target.closest ? e.target.closest("a") : null
    if (!link) return
    if (!mobileMq.matches) return
    applyState(false)
  })

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return
    if (!mobileMq.matches) return
    applyState(false)
    toggle.focus({ preventScroll: true })
  })

  mobileMq.addEventListener("change", () => {
    applyState(!mobileMq.matches)
  })
})()

