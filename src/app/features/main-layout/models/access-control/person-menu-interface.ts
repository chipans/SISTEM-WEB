export interface PersonMenu{
  id : number;
  parentId : number | null;
  iconUrl : string | null;
  title : string;
  url : string | null;
  tooltipName : string | null;
  permissionId: number;
  menuAssets : PersonMenu[];
}