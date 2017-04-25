IEGet(Name="")
{
   IfEqual, Name,, WinGetTitle, Name, ahk_class IEFrame
      Name := ( Name="新选项卡 - Internet Explorer" ) ? "about:Tabs"
      : RegExReplace( Name, " - Internet Explorer" )
   For Pwb in ComObjCreate( "Shell.Application" ).Windows
      If ( Pwb.LocationName = Name ) && InStr( Pwb.FullName, "iexplore.exe" )
         Return Pwb
} ;written by Jethrow

objIE := IEGet()
objIE.Visible := true 

objIE.document.getElementsByClassName("input_class")[0].value := "000055"
objIE.document.getElementsByClassName("input_class")[1].value := "000000als6"