//>>built
define("dojox/geo/openlayers/GreatCircle",["dojo/_base/lang","dojox/geo/openlayers/GeometryFeature","dojox/geo/openlayers/Point","dojox/geo/openlayers/LineString"],function(i,j){i.getObject("geo.openlayers",!0,dojox);dojox.geo.openlayers.GreatCircle={toPointArray:function(a,b,f){var g=a.x,e=b.x,d=Math.min(g,e),h=Math.max(g,e),c=this.DEG2RAD,g=a.y*c,a=a.x*c,e=b.y*c,b=b.x*c;Math.abs(a-b)<=this.TOLERANCE&&(b=Math.min(a,b)+Math.PI);Math.abs(b-a)==Math.PI&&g+e==0&&(e+=Math.PI/18E7);d*=c;h*=c;f*=c;for(var c=
[],i=0,k=this.RAD2DEG;d<=h;){lat=Math.atan((Math.sin(g)*Math.cos(e)*Math.sin(d-b)-Math.sin(e)*Math.cos(g)*Math.sin(d-a))/(Math.cos(g)*Math.cos(e)*Math.sin(a-b)));var j={x:d*k,y:lat*k};c[i++]=j;d<h&&d+f>=h?d=h:d+=f}return c},toLineString:function(a,b,f){a=this.toPointArray(a,b,f);return new OpenLayers.Geometry.LineString(a)},toGeometryFeature:function(a,b,f){a=this.toLineString(a,b,f);return new j(a)},DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,TOLERANCE:1.0E-5};return dojox.geo.openlayers.GreatCircle});