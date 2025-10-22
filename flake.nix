{
	description = "Web flashcards dev environment";

	inputs = {
		nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
	};

	outputs = { self, nixpkgs }:
		let
			systems = [ "x86_64-linux" "aarch64-darwin" "aarch64-linux" "x86_64-darwin" ];
			forAllSystems = nixpkgs.lib.genAttrs systems;
		in {
			devShells = forAllSystems (system:
				let
					pkgs = import nixpkgs { inherit system; };
				in pkgs.mkShell {
					buildInputs = with pkgs; [
						deno
						jj
					];
				});
		};
}
