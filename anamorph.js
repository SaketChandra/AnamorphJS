function cylinderical(im,target,R,theta) {

M = im.width;
N = im.height;
mrows=2*(R+M);
ncols=2*(R+M);

	var element1 = document.createElement('canvas');
    c1 = element1.getContext("2d");
	element1.width=M;
	element1.height=N;
	c1.drawImage(im, 0, 0);
    imageData1 = c1.getImageData(0, 0, M, N);

	var element2 = document.createElement('canvas');
    c2 = element2.getContext("2d");
	element2.width=mrows;
	element2.height=ncols;
	c2.fillStyle = "blue";
	c2.fillRect(0, 0, mrows, ncols);
	imageData2 = c2.createImageData(mrows, ncols);
	
	for(i=1;i<=M;i++){
		alpha=(theta*Math.PI*(R+M-i))/(180*N);
		if(alpha<1){alpha=1;}	
		
		for(j=1;j<=N;j++){		
			al1=(alpha*j)-(alpha/2);
			al2=(alpha*j)+(alpha/2);
			
			for(k=al1;k<=al2;k++){
				y=(k-1)*(theta/(N*alpha))*(Math.PI/180);
				Ni=R+M-(R+M-i)*Math.sin(y);
				Nj=R+M-(R+M-i)*Math.cos(y);
				
				Ni=Math.floor(Ni);
				Nj=Math.floor(Nj);
				
				copyPixel(Ni,Nj,i,N-j+1);
				copyPixel(Ni+1,Nj+1,i,N-j+1);
				copyPixel(Ni-1,Nj+1,i,N-j+1);
				copyPixel(Ni,Nj+1,i,N-j+1);
			}
		}
	}
	c2.putImageData(imageData2, 0, 0);
	LoadImage(target,element2);
}


function conical(im,target,R,theta) {



M = im.width;
N = im.height;
r=(R+R/Math.sin((theta/2)*(Math.PI/180)));
mrows=2*r;
ncols=2*r;
L=(1/2)*Math.sqrt((M*M)+(N*N));

	var element1 = document.createElement('canvas');
    c1 = element1.getContext("2d");
    element1.width=M;
	element1.height=N;
	c1.drawImage(im, 0, 0);
    imageData1 = c1.getImageData(0, 0, M, N);

	var element2 = document.createElement('canvas');
    c2 = element2.getContext("2d");
	element2.width=mrows;
	element2.height=ncols;
	c2.fillStyle = "blue";
	c2.fillRect(0, 0, mrows, ncols);
	imageData2 = c2.createImageData(mrows, ncols);
	
	for(i=R+1;i<=r;i++){
	
		Rr=((r-i+1)/(r-R))*L;
		alpha=2*Math.PI*i;
		
		for(j=1;j<=alpha;j++){
				
				y=((j-1)*(2*Math.PI))/alpha;
				ni=r-i*Math.sin(y);
				nj=r-i*Math.cos(y);
				pi=M/2-Rr*Math.sin(y)+10;
				pj=M/2-Rr*Math.cos(y);
				
				pi=Math.floor(pi);
				pj=Math.floor(pj);
				ni=Math.floor(ni);
				nj=Math.floor(nj);
				
				copyPixel(ni,nj,pi,N+1-pj);
				copyPixel(ni+1,nj+1,pi,N+1-pj);
				copyPixel(ni-1,nj+1,pi,N+1-pj);
				copyPixel(ni,nj+1,pi,N+1-pj);
		}
	}
	c2.putImageData(imageData2, 0, 0);
	LoadImage(target,element2);
}


function copyPixel(oux,ouy,inx,iny) {
			
		index1 = (inx + iny * imageData1.width) * 4;
		index2 = (oux + ouy * imageData2.width) * 4;
		
		imageData2.data[index2+0]=imageData1.data[index1+0] ;
		imageData2.data[index2+1]=imageData1.data[index1+1] ;
		imageData2.data[index2+2]=imageData1.data[index1+2] ;
		imageData2.data[index2+3]=imageData1.data[index1+3] ;
		
}


function LoadImage(target,canvas) {
	
	var x = document.createElement("IMG");
    x.setAttribute("src", canvas.toDataURL());
   
	var target = document.getElementById("target");  
	id="target"
	target.removeChild(target.childNodes[0]);
	target.appendChild(x);	
	
}


