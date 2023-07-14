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