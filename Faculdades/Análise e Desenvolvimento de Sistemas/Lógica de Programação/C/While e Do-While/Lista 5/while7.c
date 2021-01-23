#include <stdio.h>

int main()
{
	
int i = 0, prog = 0, r = 3;
while ( i <= 20 )
{
	
     i = i + 1;
     
     printf("P.A %d\n", prog);
     prog = r + prog;
     
}    
	return 0;
}
