title: xUnit
---

[xUnit](https://xunit.net) is a unit-test tool maintained mostly by [Brad Wilson](https://bradwilson.io/). It is the newest of the three major unit-test frameworks for .NET.  
It is used in the development of .NET Core and ASP.NET Core.

## How to write a single test

For xUnit every public method with the attribute `[Fact]` in a public class is a test.

Example:

```csharp
using Xunit;

namespace TestProject
{
    public class TestClass
    {
        [Fact]
        public void TestMethod()
        {

        }
    }
}

```

## How to write a test with multiple parameters

Sometimes you want to write a multiple tests, where the only difference are some parameters.  
For that xUnit has the `[Theory]` attribute.

The data can be provided via different attributes:

- `[InlineData]`
- `[ClassData]`
- `[MemberData]`

### InlineData

The `[InlineData]` attribute is the simplest way to provide data for a test. All data is provided in the attribute itself and is hard-coded.  
If you have only a few test cases, this is the easiest way to provide the data.

Example:

```csharp
using Xunit;

namespace TestProject
{
    public class TestClass
    {
        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public void TestMethod(int value)
        {

        }
    }
}

```

### ClassData

The `[ClassData]` attribute is used to provide data from a class. The class must implement the `IEnumerable<object[]>` interface, so that it can be used as a data source.

Example:

```csharp
using System.Collections.Generic;
using Xunit;

namespace TestProject
{
    class TestData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[] { 1 };
            yield return new object[] { 2 };
            yield return new object[] { 3 };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }

    public class TestClass
    {
        [Theory]
        [ClassData(typeof(TestData))]
        public void TestMethod(int value)
        {

        }
    }
}

### MemberData

The `[MemberData]` attribute is used to provide data from a static member of a class. The member must be public and static and return an `IEnumerable<object[]>`.

Example:

```csharp
using System.Collections.Generic;
using Xunit;

namespace TestProject
{
    public class TestClass
    {
        public static IEnumerable<object[]> TestData()
        {
            yield return new object[] { 1 };
            yield return new object[] { 2 };
            yield return new object[] { 3 };
        }

        [Theory]
        [MemberData(nameof(TestData))]
        public void TestMethod(int value)
        {

        }
    }
}

```

## Tips and Tricks

### Connect ILogger to Test Output

Martin Costello created a nice NuGet Package (https://www.nuget.org/packages/MartinCostello.Logging.XUnit/) to bring the ILogger output to the test output.

1. Add the NuGet Package to your test project
1. Adjust your WebApplicationFactory that you call `p.AddXunit()`

``` csharp
public sealed class TestWebApplicationFactory : WebApplicationFactory<FakeEntrypoint>
{
    /// <inheritdoc />
    public ITestOutputHelper? OutputHelper { get; set; }

    /// <inheritdoc />
    protected override void ConfigureWebHost(IWebHostBuilder builder)
        => builder.ConfigureLogging((p) => p.AddXUnit(this));
}
```

3. Add this method to your TestWebApplicationFactory

``` csharp
public void SetTestOutput(ITestOutputHelper testOutputHelper)
{
    Services.GetRequiredService<ITestOutputHelperAccessor>().OutputHelper = testOutputHelper;
}
```

4. In every test class, you need to adjust the constructor to call the `SetTestOutput` method on the TestWebApplicationFactory

``` csharp
public class TestClass : IClassFixture<TestWebApplicationFactory>
{
    public TestClass(TestWebApplicationFactory factory, ITestOutputHelper testOutputHelper)
    {
        factory.SetTestOutput(testOutputHelper);
    }
}
```
