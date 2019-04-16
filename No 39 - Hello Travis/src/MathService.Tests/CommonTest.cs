using System;
using Xunit;
using MathService;

namespace MathService.Tests
{
    public class CommonTest
    {
        private Common _common;

        public CommonTest()
        {
            _common = new Common();
        }

        [Fact]
        public void Negative_Four_Is_Negative()
        {
            var result=_common.IsNegative(-4);

            Assert.True(result,"-4 is negative number");
        }


        [Fact]
        public void Four_Is_Even()
        {
            var result=_common.IsEven(4);

            Assert.True(result,"4 is an even number");
        }
    }
}
