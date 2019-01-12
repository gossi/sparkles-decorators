workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["nuxt/actions-yarn@master"]
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Test" {
  uses = "nuxt/actions-yarn@master"
  needs = ["Build"]
  args = "test"
}

action "Tag" {
  uses = "actions/bin/filter@b2bea0749eed6beb495a8fa194c071847af60ea1"
  needs = ["Test"]
  args = "tag"
}

action "nuxt/actions-yarn@master" {
  uses = "nuxt/actions-yarn@master"
  needs = ["Tag"]
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
