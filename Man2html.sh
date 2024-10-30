#!/bin/bash

# testado com mandoc-1.14.6-8.fc40.x86_64
# flamont v24.08.0

# Note: doesn't have trailing spaces
SCRIPT_PATH=$(realpath $(dirname $BASH_SOURCE))

echoerr() { echo "$@" 1>&2; }

function CreateTmpFile() {
    local CONVERTER_TO_USE="none_found"
    if command -v "mandoc" &>/dev/null; then
        CONVERTER_TO_USE="mandoc"
    elif command -v "man" &>/dev/null; then
        CONVERTER_TO_USE="man-db"
        echoerr "using fallback 'man -H' which can't process man pages as well as mandoc."
        echoerr "please run dnf install mandoc"
    else
        echoerr "No suitable mandoc/troff converter found."
        echoerr "Please install mandoc or man-db"
        return 1
    fi

    # For reference, here is how I was doing it with groff
    # zcat $manpage | groff -T html > output.html

    local man_paths=$(man --path --all "$@")
    for manpage in $man_paths; do
        echoerr "Man2html: processing ${manpage}"

        local basename=$(basename "$manpage")
        local newfile="/tmp/${basename}.html"

        if [ $CONVERTER_TO_USE = "mandoc" ]; then
            # warn: im not escaping the script path to be HTML compatible, use unspaced ASCII!!
            # /usr/share/misc/flamont_archlinux_mandoc.css
            mandoc -T html -O style=$SCRIPT_PATH/flamont_archlinux_mandoc.css $manpage > "$newfile"

            # inserir o javascript de pesquisar flags e de mostrar indice
            local SED_SCRIPT='/^<\/body>/i \' # colocar no fim do documento, em que tudo já está carregado
            SED_SCRIPT+="<script src='$SCRIPT_PATH/Man2html_enhancements.js'></script>"
            echo "$SED_SCRIPT"
            sed -i "$SED_SCRIPT" "$newfile"

            sleep 0.6
            xdg-open "$newfile"
        elif [ $CONVERTER_TO_USE = "man-db" ]; then
            BROWSER="xdg-open" man -H $manpage
        else
            echoerr "ERROR: TRYING TO PROCESS MAN PAGE WITHOUT KNOWING WHICH CONVERTER TO USE"
            return 1
        fi
    done
}

CreateTmpFile "$@"
