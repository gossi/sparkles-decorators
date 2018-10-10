import SparklesComponent from 'sparkles-component';
import { arg } from 'sparkles-decorators';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import 'qunit-dom';

module('arg: js', function (hooks) {
  setupRenderingTest(hooks);

  test('argument as property', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg foo;
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest @foo='bar'/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('bar');
  });

  test('renamed argument as property', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.bam}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg({name: 'foo'}) bam;
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest @foo='bar'/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('bar');
  });

  test('argument default value', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg({default: 'bar'}) foo;
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('');
  });

  test('argument default initializer', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg foo = 'bar';
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('');
  });

  test('argument default value as function', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg({
        default: function () {
          return 'bar';
        }
      }) foo;
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('');
  });

  test('argument default initializer as function', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg foo = function () {
        return 'bar';
      };
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('');
  });

  test('argument default value as method', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      bar = 'bar';
      @arg({
        default: function () {
          return this.bar;
        }
      }) foo;
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('');
  });

  test('argument default initializer as method', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      bar = 'bar';
      @arg({
        default: function () {
          return this.bar;
        }
      }) foo;
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('');
  });

  test('update from the outside', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg foo;
    }
    this.owner.register('component:under-test', UnderTest);

    this.set('bar', 'bar');

    await render(hbs`<UnderTest @foo={{bar}}/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('bar');

    this.set('bar', 'baz');
    assert.dom('span').hasText('baz');
    assert.dom('p').hasText('baz');
  });
});
