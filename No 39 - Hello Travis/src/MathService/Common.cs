using System;

namespace MathService
{
    public class Common
    {
        public bool IsNegative(int number)
        {
            return number<0;
        }

        public bool IsEven(int number)
        {
            return number % 2 == 0;
        }
    }
}
