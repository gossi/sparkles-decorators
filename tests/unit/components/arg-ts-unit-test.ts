import SparklesComponent from 'sparkles-component';
import { arg } from 'sparkles-decorators';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import 'qunit-dom';
import { guidFor } from '@ember/object/internals';

module('Unit | @arg: ts', function (hooks) {
  setupTest(hooks);

  test('blank @arg', (assert) => {
    class TestComponent extends SparklesComponent {
      @arg foo?: string;
    }

    const cls = new TestComponent({ foo: 'bar' });
    assert.equal(cls.foo, 'bar');
  });

  test('@arg with default value', (assert) => {
    class TestComponent extends SparklesComponent {
      @arg foo?: string = 'blubb';
    }

    const cls = new TestComponent({ foo: 'bar' });
    assert.equal(cls.foo, 'bar');
  });

  test('@arg with fallback to default', (assert) => {
    class TestComponent extends SparklesComponent {
      @arg foo?: string = 'blubb';
    }

    const cls = new TestComponent({});
    assert.equal(cls.foo, 'blubb');
  });

  test('@arg renamed', (assert) => {
    class TestComponent extends SparklesComponent {
      @arg('foo') bam!: string;
    }

    const cls = new TestComponent({foo: 'blubb'});
    assert.equal(cls.bam, 'blubb');
  });

  test('@arg renamed (config)', (assert) => {
    class TestComponent extends SparklesComponent {
      @arg({name: 'foo'}) bam!: string;
    }

    const cls = new TestComponent({foo: 'blubb'});
    assert.equal(cls.bam, 'blubb');
  });

  test('@arg with fallback to default (config)', (assert) => {
    class TestComponent extends SparklesComponent {
      @arg({default: 'blubb'}) foo?: string;
    }

    const cls = new TestComponent({});
    assert.equal(cls.foo, 'blubb');
  });

  test('@arg with fallback to default function (config)', (assert) => {
    class TestComponent extends SparklesComponent {
      @arg({
        default: function () {
          return 'blubb';
        }
      }) foo?: string;
    }

    const cls = new TestComponent({});
    assert.equal(cls.foo, 'blubb');
  });

  test('@arg with fallback to default function', (assert) => {
    class TestComponent extends SparklesComponent {
      @arg foo = function () {
        return 'blubb';
      };
    }

    const cls = new TestComponent({});
    assert.equal(cls.foo, 'blubb');
  });

  test('guid shall be guid', assert => {
    class TestComponent extends SparklesComponent {
      @arg id = guidFor(this);
    }

    const clsA = new TestComponent({});
    const clsB = new TestComponent({});

    assert.notEqual(clsA.id, clsB.id);
  });
});
