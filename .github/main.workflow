workflow "Publishing" {
  on = "push"
  resolves = ["Publish"]
}

action "Filter" {
  uses = "actions/bin/filter@b2bea0749eed6beb495a8fa194c071847af60ea1"
  args = "tag"
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
  needs = ["Filter"]
}

action "Publish" {
  uses = "nuxt/actions-yarn@master"
  needs = ["Build"]
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
