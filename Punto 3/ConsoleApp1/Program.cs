using System;
using System.Threading;

namespace ConsoleApp1
{
    class Work
    {
        public class Example
        {
            static Object obj = new Object();            
            public static void Main()
            {                
                int[] a = new int[] { 1, 3, 5 };
                int[] b = new int[] { 2, 4, 6 };
               
                var th1 = new Thread(ShowThreadInformation);
                th1.Start(a);
                var th2 = new Thread(ShowThreadInformation);               
                th2.Start(b);
            }

            private static void ShowThreadInformation(Object state)
            {
                int[] i = (int[])state;
                Console.WriteLine(i[0]);
                Thread.Sleep(500);
                Console.WriteLine(i[1]);
                Thread.Sleep(500);
                Console.WriteLine(i[2]);
                
            }
        }
    }
}
