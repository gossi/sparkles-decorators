import SparklesComponent from 'sparkles-component';
import { arg } from 'sparkles-decorators';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import 'qunit-dom';
import { guidFor } from '@ember/object/internals';

module('Integration | @arg: ts', function (hooks) {
  setupRenderingTest(hooks);

  test('argument as property', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg foo!: string;
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
      @arg({name: 'foo'}) bam!: string;
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
      @arg({default: 'bar'}) foo!: string;
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
      @arg foo: string = 'bar';
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
      }) foo!: string;
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
      }) foo!: string;
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
      @arg foo(): string {
        return this.bar;
      };
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest/>`);
    assert.dom('span').hasText('bar');
    assert.dom('p').hasText('');
  });

  test('id as guid', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.id}}</span>
      <p>{{@id}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg id: string = guidFor(this);
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest/>`);
    assert.dom('span').hasAnyText();
    assert.dom('p').hasText('');
  });

  test('id as argument', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.id}}</span>
      <p>{{@id}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg id: string = guidFor(this);
    }
    this.owner.register('component:under-test', UnderTest);

    await render(hbs`<UnderTest @id="abc"/>`);
    assert.dom('span').hasText('abc');
    assert.dom('p').hasText('abc');
  });

  test('update from the outside', async function (assert) {
    this.owner.register('template:components/under-test', hbs`
      <span>{{this.foo}}</span>
      <p>{{@foo}}</p>
    `);
    class UnderTest extends SparklesComponent {
      @arg foo!: string;
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
